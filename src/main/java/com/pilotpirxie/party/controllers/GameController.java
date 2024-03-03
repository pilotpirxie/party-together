package com.pilotpirxie.party.controllers;

import com.pilotpirxie.party.entities.CategoryEntity;
import com.pilotpirxie.party.entities.GameEntity;
import com.pilotpirxie.party.entities.QuestionEntity;
import com.pilotpirxie.party.entities.UserEntity;
import com.pilotpirxie.party.events.common.PingEvent;
import com.pilotpirxie.party.events.incoming.JoinEvent;
import com.pilotpirxie.party.repositories.CategoryRepository;
import com.pilotpirxie.party.repositories.GameRepository;
import com.pilotpirxie.party.repositories.QuestionRepository;
import com.pilotpirxie.party.repositories.UserRepository;
import com.pilotpirxie.party.services.GameMessagingService;
import com.pilotpirxie.party.services.SessionGameMappingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
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


    public GameController(
        GameMessagingService gameMessagingService,
        SessionGameMappingService sessionGameMappingService,
        GameRepository gameRepository,
        UserRepository userRepository,
        CategoryRepository categoryRepository,
        QuestionRepository questionRepository
    ) {
        this.gameMessagingService = gameMessagingService;
        this.sessionGameMappingService = sessionGameMappingService;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.questionRepository = questionRepository;
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
            newGame.setTimerTo(null);
            newGame.setTimeToAnswer(0);
            newGame.setTimeToDraw(0);
            newGame.setCreatedAt(java.time.LocalDateTime.now());
            newGame.setUpdatedAt(java.time.LocalDateTime.now());
            newGame.setGameQuestionIds(gameQuestionIds);
            gameRepository.save(newGame);
        }

        var game = gameExists.orElseGet(() -> gameRepository.findByCode(event.code()).get());
        sessionGameMappingService.mapSessionToGame(headerAccessor.getSessionId(), game.getId().toString());

        var newUser = new UserEntity();
        newUser.setSessionId(headerAccessor.getSessionId());
        newUser.setNickname(event.nickname());
        newUser.setAvatar(event.avatar().toString());
        newUser.setCreatedAt(java.time.LocalDateTime.now());
        newUser.setUpdatedAt(java.time.LocalDateTime.now());
        newUser.setGame(game);
        newUser.setReady(false);
        userRepository.save(newUser);

        // get all users in game
        // get current user
        // get game state
        // create big event with all the data
        // send to user

        //        sessionGameMappingService.mapSessionToGame(headerAccessor.getSessionId(), "gameId");
        //        var gameId = UUID.randomUUID().toString();
        //        var game = new GameDto(gameId, "code", 0, null, 0, 0, null, null);
        //        var users = List.of(new UserDto(UUID.randomUUID().toString(), headerAccessor.getSessionId(), UUID.randomUUID().toString(), "nickname", "avatar", false, null, null));
        //        String sessionId = headerAccessor.getSessionId();
        //        gameMessagingService.sendToUser(sessionId, "Joined", new JoinedEvent(game, null, users));
        //        gameMessagingService.broadcastToGame(gameId, "UsersState", new UsersStateEvent(users));
    }

    @MessageMapping("/Ping")
    public void pingGame(@Payload PingEvent event, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("Pinging game");

        var gameId = gameMessagingService.getGameId(headerAccessor.getSessionId());
        gameMessagingService.broadcastToGame(gameId, "Ping", new PingEvent());
    }
}
