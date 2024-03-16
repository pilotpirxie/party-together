package com.pilotpirxie.party.services;

import com.pilotpirxie.party.config.GameMessaging;
import com.pilotpirxie.party.dto.AnswerDto;
import com.pilotpirxie.party.dto.AnswerHistoryDto;
import com.pilotpirxie.party.dto.QuestionDto;
import com.pilotpirxie.party.dto.events.outgoing.AnswersHistoryStateEvent;
import com.pilotpirxie.party.dto.events.outgoing.GameStateEvent;
import com.pilotpirxie.party.dto.events.outgoing.JoinedEvent;
import com.pilotpirxie.party.dto.events.outgoing.UsersStateEvent;
import com.pilotpirxie.party.entities.*;
import com.pilotpirxie.party.mapper.*;
import com.pilotpirxie.party.repositories.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class GameService {
    private final GameMessaging gameMessaging;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final AnswersHistoryRepository answersHistoryRepository;

    public GameService(
        GameMessaging gameMessaging,
        GameRepository gameRepository,
        UserRepository userRepository,
        CategoryRepository categoryRepository,
        QuestionRepository questionRepository,
        AnswerRepository answerRepository,
        AnswersHistoryRepository answersHistoryRepository
    ) {
        this.gameMessaging = gameMessaging;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.answersHistoryRepository = answersHistoryRepository;
    }

    public UUID createGame() {
        var categories = categoryRepository.findAll();
        List<CategoryEntity> categoriesList = StreamSupport
            .stream(categories.spliterator(), false)
            .collect(Collectors.toList());
        Collections.shuffle(categoriesList);
        List<CategoryEntity> randomCategories = categoriesList.subList(0, Math.min(categoriesList.size(), 4));

        var questions = new ArrayList<QuestionEntity>();
        var allQuestions = questionRepository.findAllByCategoryIdIn(randomCategories.stream().map(CategoryEntity::getId).collect(Collectors.toSet()));

        for (var category : randomCategories) {
            var categoryQuestions = allQuestions
                .stream()
                .filter(question -> question.getCategoryId().equals(category.getId()))
                .collect(Collectors.toList());
            Collections.shuffle(categoryQuestions);
            questions.addAll(categoryQuestions.subList(0, Math.min(categoryQuestions.size(), 5)));
        }

        var gameCategoryIds = new ArrayList<UUID>();
        for (var category : randomCategories) {
            gameCategoryIds.add(category.getId());
        }

        var gameQuestionIds = new ArrayList<UUID>();
        for (var category : gameCategoryIds) {
            for (var question : questions) {
                if (!question.getCategoryId().equals(category)) {
                    continue;
                }

                gameQuestionIds.add(question.getId());
            }
        }

        var randomCode = UUID.randomUUID().toString().substring(0, 6);
        while (gameRepository.findByCode(randomCode).isPresent()) {
            randomCode = UUID.randomUUID().toString().substring(0, 6);
        }

        var newGame = new GameEntity();
        newGame.setCode(randomCode);
        newGame.setQuestionIndex(0);
        newGame.setTimeToAnswer(60);
        newGame.setTimeToDraw(120);
        newGame.setGameQuestionIds(gameQuestionIds);
        newGame.setGameCategoryIds(gameCategoryIds);
        newGame.setState(GameState.WAITING);
        gameRepository.save(newGame);

        return newGame.getId();
    }

    public Optional<UUID> getGameId(String code) {
        return gameRepository.findByCode(code).map(GameEntity::getId);
    }

    public void joinGame(String sessionId, String nickname, int avatar, UUID gameId) {
        var game = gameRepository.findById(gameId).orElseThrow();

        var userWithCurrentSession = userRepository.findBySessionId(sessionId);
        if (userWithCurrentSession.isEmpty()) {
            var newUser = new UserEntity();
            newUser.setSessionId(sessionId);
            newUser.setNickname(nickname);
            newUser.setAvatar(avatar);
            newUser.setGameId(gameId);
            newUser.setReady(false);
            newUser.setConnected(true);
            userRepository.save(newUser);
            userWithCurrentSession = Optional.of(newUser);
        }

        var currentUser = userWithCurrentSession.orElseThrow();
        var questions = questionRepository.findAllById(game.getGameQuestionIds());
        var answers = answerRepository.findAllByQuestionIdIn(game.getGameQuestionIds());

        List<QuestionEntity> questionsList = new ArrayList<>();
        for (var question : questions) {
            questionsList.add(question);
        }

        var questionsListDto = new ArrayList<QuestionDto>();
        for (var questionId : game.getGameQuestionIds()) {
            var question = questionsList.stream().filter(q -> q.getId().equals(questionId)).findFirst().orElseThrow();

            Set<AnswerDto> questionAnswers = answers
                .stream()
                .filter(answer -> answer.getQuestionId().equals(question.getId()))
                .map(AnswerMapper::toDto)
                .collect(Collectors.toSet());

            questionsListDto.add(QuestionMapper.toDto(question, questionAnswers));
        }

        var categories = categoryRepository.findAllByIdIn(game.getGameCategoryIds());
        var categoriesListDto = new ArrayList<>(categories).stream().map(CategoryMapper::toDto).toList();

        var gameDto = GameMapper.toDto(game);

        var users = userRepository.findAllByGameId(game.getId());
        var usersListDto = new ArrayList<>(users).stream().filter(UserEntity::isConnected).map(UserMapper::toDto).toList();
        var currentUserDto = UserMapper.toDto(currentUser);
        var answersHistory = answersHistoryRepository.findAllByGameId(gameId).stream().map(AnswerHistoryMapper::toDto).toList();

        var joinedEvent = new JoinedEvent(gameDto, questionsListDto, categoriesListDto, usersListDto, currentUserDto, answersHistory);
        gameMessaging.sendToUser(sessionId, "Joined", joinedEvent);
    }

    public void sendUsersState(UUID gameId) {
        var users = userRepository.findAllByGameId(gameId);
        var usersListDto = new ArrayList<>(users).stream().filter(UserEntity::isConnected).map(UserMapper::toDto).toList();
        gameMessaging.broadcastToGame(gameId.toString(), "UsersState", new UsersStateEvent(usersListDto));
    }

    public void toggleReady(String sessionId) {
        var user = userRepository.findBySessionId(sessionId).orElseThrow();
        user.setReady(!user.isReady());
        userRepository.save(user);
    }

    public void setReady(String sessionId, boolean ready) {
        var user = userRepository.findBySessionId(sessionId).orElseThrow();
        user.setReady(ready);
        userRepository.save(user);
    }

    public void setEveryoneReady(UUID gameId, boolean ready) {
        var users = userRepository.findAllByGameId(gameId);
        for (var user : users) {
            user.setReady(ready);
        }
        userRepository.saveAll(users);
    }

    public void startGame(UUID gameId) {
        var game = gameRepository.findById(gameId).orElseThrow();
        game.setState(GameState.CATEGORY);
        game.setQuestionIndex(0);
        gameRepository.save(game);
    }

    public void sendGameState(UUID gameId) {
        var game = gameRepository.findById(gameId).orElseThrow();
        var gameDto = GameMapper.toDto(game);
        gameMessaging.broadcastToGame(game.getId().toString(), "GameState", new GameStateEvent(gameDto));
    }

    public void sendAnswersHistoryState(UUID gameId) {
        var game = gameRepository.findById(gameId).orElseThrow();
        List<AnswerHistoryDto> answers = answersHistoryRepository.findAllByGameId(gameId).stream().map(AnswerHistoryMapper::toDto).toList();
        var answersHistoryEvent = new AnswersHistoryStateEvent(answers);
        gameMessaging.broadcastToGame(game.getId().toString(), "AnswersHistoryState", answersHistoryEvent);
    }

    public void changeQuestionIndex(UUID gameId, int newQuestionIndex) {
        var game = gameRepository.findById(gameId).orElseThrow();

        if (newQuestionIndex >= game.getGameQuestionIds().size()) {
            game.setState(GameState.FINISHED);
            gameRepository.save(game);
            return;
        }

        var oldQuestion = questionRepository
            .findById(game.getGameQuestionIds().get(game.getQuestionIndex()))
            .orElseThrow();
        var newQuestion = questionRepository
            .findById(game.getGameQuestionIds().get(newQuestionIndex))
            .orElseThrow();
        var categoryChanged = !oldQuestion.getCategoryId().equals(newQuestion.getCategoryId());
        if (categoryChanged) {
            game.setState(GameState.CATEGORY);
        }
        game.setQuestionIndex(newQuestionIndex);
        var newTime = newQuestion.getType() == QuestionType.DRAWING
            ? Instant.now().plusSeconds(game.getTimeToDraw())
            : Instant.now().plusSeconds(game.getTimeToAnswer());
        game.setTimerTo(newTime);
        gameRepository.save(game);
    }

    public void setGameState(UUID gameId, GameState state) {
        var game = gameRepository.findById(gameId).orElseThrow();
        game.setState(state);
        gameRepository.save(game);
    }

    public void saveAnswer(UUID gameId, String sessionId, String questionId, String answer) {
        var user = userRepository.findBySessionId(sessionId).orElseThrow();
        var question = questionRepository.findById(UUID.fromString(questionId)).orElseThrow();

        var alreadyAnswered = answersHistoryRepository
            .findByGameIdAndQuestionIdAndUserId(gameId, UUID.fromString(questionId), user.getId())
            .isPresent();

        if (alreadyAnswered) {
            return;
        }

        var newAnswer = new AnswersHistoryEntity();
        newAnswer.setGameId(gameId);
        newAnswer.setQuestionId(UUID.fromString(questionId));
        newAnswer.setUserId(user.getId());

        if (question.getType() == QuestionType.DRAWING) {
            newAnswer.setDrawing(answer);
        } else if (question.getType() == QuestionType.WHAT) {
            var answerId = UUID.fromString(answer);
            answerRepository.findById(answerId).orElseThrow();
            newAnswer.setAnswerId(UUID.fromString(answer));
        } else if (question.getType() == QuestionType.WHO) {
            var userId = UUID.fromString(answer);
            userRepository.findById(userId).orElseThrow();
            newAnswer.setSelectedUserId(UUID.fromString(answer));
        }

        answersHistoryRepository.save(newAnswer);
    }
}
