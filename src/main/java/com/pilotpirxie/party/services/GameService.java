package com.pilotpirxie.party.services;

import com.pilotpirxie.party.dto.AnswerDto;
import com.pilotpirxie.party.dto.QuestionDto;
import com.pilotpirxie.party.dto.events.outgoing.GameStateEvent;
import com.pilotpirxie.party.dto.events.outgoing.JoinedEvent;
import com.pilotpirxie.party.dto.events.outgoing.UsersStateEvent;
import com.pilotpirxie.party.entities.*;
import com.pilotpirxie.party.mapper.*;
import com.pilotpirxie.party.repositories.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class GameService {
    private final GameMessagingService gameMessagingService;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public GameService(
        GameMessagingService gameMessagingService,
        GameRepository gameRepository,
        UserRepository userRepository,
        CategoryRepository categoryRepository,
        QuestionRepository questionRepository,
        AnswerRepository answerRepository
    ) {
        this.gameMessagingService = gameMessagingService;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
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

        var gameQuestionIds = new ArrayList<UUID>();
        for (var question : questions) {
            gameQuestionIds.add(question.getId());
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
        newGame.setCreatedAt(java.time.LocalDateTime.now());
        newGame.setUpdatedAt(java.time.LocalDateTime.now());
        newGame.setGameQuestionIds(gameQuestionIds);
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

        var questionsListDto = new ArrayList<QuestionDto>();
        var categoryIds = new HashSet<UUID>();
        for (var question : questions) {
            Set<AnswerDto> questionAnswers = answers
                .stream()
                .filter(answer -> answer.getQuestionId().equals(question.getId()))
                .map(AnswerMapper::toDto)
                .collect(Collectors.toSet());

            questionsListDto.add(QuestionMapper.toDto(question, questionAnswers));
            categoryIds.add(question.getCategoryId());
        }

        var categories = categoryRepository.findAllByIdIn(categoryIds);
        var categoriesListDto = new ArrayList<>(categories).stream().map(CategoryMapper::toDto).toList();

        var gameDto = GameMapper.toDto(game);

        var users = userRepository.findAllByGameId(game.getId());
        var usersListDto = new ArrayList<>(users).stream().filter(UserEntity::isConnected).map(UserMapper::toDto).toList();
        var currentUserDto = UserMapper.toDto(currentUser);

        var joinedEvent = new JoinedEvent(gameDto, questionsListDto, categoriesListDto, usersListDto, currentUserDto);
        gameMessagingService.sendToUser(sessionId, "Joined", joinedEvent);
    }

    public void sendUsersState(UUID gameId) {
        var users = userRepository.findAllByGameId(gameId);
        var usersListDto = new ArrayList<>(users).stream().filter(UserEntity::isConnected).map(UserMapper::toDto).toList();
        gameMessagingService.broadcastToGame(gameId.toString(), "UsersState", new UsersStateEvent(usersListDto));
    }

    public void toggleReady(String sessionId) {
        var user = userRepository.findBySessionId(sessionId).orElseThrow();
        user.setReady(!user.isReady());
        userRepository.save(user);
    }

    public void startGame(UUID gameId) {
        var game = gameRepository.findById(gameId).orElseThrow();
        game.setState(GameState.CATEGORY);
        gameRepository.save(game);
    }

    public void sendGameState(UUID gameId) {
        var game = gameRepository.findById(gameId).orElseThrow();
        var gameDto = GameMapper.toDto(game);
        gameMessagingService.broadcastToGame(game.getId().toString(), "GameState", new GameStateEvent(gameDto));
    }
}
