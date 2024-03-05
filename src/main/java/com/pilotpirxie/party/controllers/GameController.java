package com.pilotpirxie.party.controllers;

import com.pilotpirxie.party.dto.AnswerDto;
import com.pilotpirxie.party.dto.QuestionDto;
import com.pilotpirxie.party.dto.events.incoming.JoinEvent;
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

        var gameExists = gameRepository.findByCode(event.code());
        if (gameExists.isEmpty()) {
            var categories = categoryRepository.findAll();
            List<CategoryEntity> categoriesList = StreamSupport
                .stream(categories.spliterator(), false)
                .collect(Collectors.toList());
            Collections.shuffle(categoriesList);
            List<CategoryEntity> randomCategories = categoriesList.subList(0, Math.min(categoriesList.size(), 4));

            var questions = new ArrayList<QuestionEntity>();
            for (var category : randomCategories) {
                var categoryQuestions = questionRepository.findByCategoryId(category.getId());
                var categoryQuestionsList = new ArrayList<>(categoryQuestions);
                Collections.shuffle(categoryQuestionsList);
                questions.addAll(categoryQuestionsList.subList(0, Math.min(categoryQuestionsList.size(), 5)));
            }

            var gameQuestionIds = new ArrayList<UUID>();
            for (var question : questions) {
                gameQuestionIds.add(question.getId());
            }

            var newGame = new GameEntity();
            newGame.setCode(event.code());
            newGame.setQuestionIndex(0);
            newGame.setTimeToAnswer(60);
            newGame.setTimeToDraw(120);
            newGame.setCreatedAt(java.time.LocalDateTime.now());
            newGame.setUpdatedAt(java.time.LocalDateTime.now());
            newGame.setGameQuestionIds(gameQuestionIds);
            newGame.setState(GameState.WAITING);
            gameRepository.save(newGame);
        }

        var game = gameExists.orElseGet(() -> gameRepository.findByCode(event.code()).orElseThrow());
        sessionGameMappingService.mapSessionToGame(headerAccessor.getSessionId(), game.getId().toString());

        var userWithCurrentSession = userRepository.findBySessionId(headerAccessor.getSessionId());
        if (userWithCurrentSession.isEmpty()) {
            var newUser = new UserEntity();
            newUser.setSessionId(headerAccessor.getSessionId());
            newUser.setNickname(event.nickname());
            newUser.setAvatar(event.avatar());
            newUser.setCreatedAt(java.time.LocalDateTime.now());
            newUser.setUpdatedAt(java.time.LocalDateTime.now());
            newUser.setGame(game);
            newUser.setReady(false);
            newUser.setConnected(true);
            userRepository.save(newUser);
        }

        var users = userRepository.findByGameId(game.getId());
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
                .filter(answer -> answer.getQuestion().getId().equals(question.getId()))
                .map(AnswerMapper::toDto)
                .collect(Collectors.toSet());

            questionsListDto.add(QuestionMapper.toDto(question, questionAnswers));
            categoryIds.add(question.getCategory().getId());
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
}
