package com.pilotpirxie.party.controllers;

import com.pilotpirxie.party.dto.AnswerDto;
import com.pilotpirxie.party.dto.QuestionDto;
import com.pilotpirxie.party.dto.events.incoming.JoinEvent;
import com.pilotpirxie.party.dto.events.outgoing.GameStateEvent;
import com.pilotpirxie.party.dto.events.outgoing.JoinedEvent;
import com.pilotpirxie.party.dto.events.outgoing.UsersStateEvent;
import com.pilotpirxie.party.entities.*;
import com.pilotpirxie.party.mapper.*;
import com.pilotpirxie.party.repositories.*;
import com.pilotpirxie.party.services.GameMessagingService;
import com.pilotpirxie.party.services.SessionGameMappingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
public class GameController {
    private final GameMessagingService gameMessagingService;
    private final SessionGameMappingService sessionGameMappingService;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;


    public GameController(
        GameMessagingService gameMessagingService,
        SessionGameMappingService sessionGameMappingService,
        GameRepository gameRepository,
        UserRepository userRepository,
        CategoryRepository categoryRepository,
        QuestionRepository questionRepository,
        AnswerRepository answerRepository
    ) {
        this.gameMessagingService = gameMessagingService;
        this.sessionGameMappingService = sessionGameMappingService;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    @MessageMapping("/Join")
    public void joinGame(@Payload JoinEvent event, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("Joining game");
        System.out.println(event);

        Optional<GameEntity> gameExists = event.code().isEmpty() ? Optional.empty() : gameRepository.findByCode(event.code());

        if (gameExists.isEmpty()) {
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
            gameExists = Optional.of(newGame);
        }

        var game = gameExists.orElseThrow();
        sessionGameMappingService.mapSessionToGame(headerAccessor.getSessionId(), game.getId().toString());

        var userWithCurrentSession = userRepository.findBySessionId(headerAccessor.getSessionId());
        if (userWithCurrentSession.isEmpty()) {
            var newUser = new UserEntity();
            newUser.setSessionId(headerAccessor.getSessionId());
            newUser.setNickname(event.nickname());
            newUser.setAvatar(event.avatar());
            newUser.setCreatedAt(java.time.LocalDateTime.now());
            newUser.setUpdatedAt(java.time.LocalDateTime.now());
            newUser.setGameId(game.getId());
            newUser.setReady(false);
            newUser.setConnected(true);
            userRepository.save(newUser);
        }

        var users = userRepository.findAllByGameId(game.getId());
        var currentUser = users
            .stream()
            .filter(user -> user.getSessionId().equals(headerAccessor.getSessionId()))
            .findFirst()
            .orElseThrow();

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
        var usersListDto = new ArrayList<>(users).stream().filter(UserEntity::isConnected).map(UserMapper::toDto).toList();
        var currentUserDto = UserMapper.toDto(currentUser);

        var joinedEvent = new JoinedEvent(gameDto, questionsListDto, categoriesListDto, usersListDto, currentUserDto);
        gameMessagingService.sendToUser(headerAccessor.getSessionId(), "Joined", joinedEvent);

        var usersStateEvent = new UsersStateEvent(usersListDto);
        gameMessagingService.broadcastToGame(game.getId().toString(), "UsersState", usersStateEvent);
    }

    @MessageMapping("/ToggleReady")
    public void toggleReady(SimpMessageHeaderAccessor headerAccessor) {
        var user = userRepository.findBySessionId(headerAccessor.getSessionId()).orElseThrow();
        user.setReady(!user.isReady());
        userRepository.save(user);

        var gameId = user.getGameId();
        var users = userRepository.findAllByGameId(gameId);
        var usersListDto = new ArrayList<>(users).stream().filter(UserEntity::isConnected).map(UserMapper::toDto).toList();

        var usersStateEvent = new UsersStateEvent(usersListDto);
        gameMessagingService.broadcastToGame(gameId.toString(), "UsersState", usersStateEvent);
    }

    @MessageMapping("/StartGame")
    public void startGame(SimpMessageHeaderAccessor headerAccessor) {
        var user = userRepository.findBySessionId(headerAccessor.getSessionId()).orElseThrow();
        var game = gameRepository.findById(user.getGameId()).orElseThrow();
        game.setState(GameState.CATEGORY);
        gameRepository.save(game);

        var users = userRepository.findAllByGameId(game.getId());
        var usersListDto = new ArrayList<>(users).stream().filter(UserEntity::isConnected).map(UserMapper::toDto).toList();

        var usersStateEvent = new UsersStateEvent(usersListDto);
        gameMessagingService.broadcastToGame(game.getId().toString(), "UsersState", usersStateEvent);

        var gameDto = new GameStateEvent(GameMapper.toDto(game));
        gameMessagingService.broadcastToGame(game.getId().toString(), "GameState", gameDto);
    }
}
