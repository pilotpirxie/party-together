package com.pilotpirxie.party.controllers;

import com.pilotpirxie.party.dto.events.incoming.ContinueToQuestionEvent;
import com.pilotpirxie.party.dto.events.incoming.JoinEvent;
import com.pilotpirxie.party.dto.events.incoming.SendAnswerEvent;
import com.pilotpirxie.party.entities.GameState;
import com.pilotpirxie.party.services.GameService;
import com.pilotpirxie.party.services.SessionGameMappingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {
    private final SessionGameMappingService sessionGameMappingService;
    private final GameService gameService;

    public GameController(
        SessionGameMappingService sessionGameMappingService,
        GameService gameService
    ) {
        this.sessionGameMappingService = sessionGameMappingService;
        this.gameService = gameService;
    }

    @MessageMapping("/Join")
    public void joinGame(@Payload JoinEvent event, SimpMessageHeaderAccessor headerAccessor) {
        var gameId = event.code().isEmpty()
            ? gameService.createGame()
            : gameService.getGameId(event.code()).orElseGet(gameService::createGame);
        gameService.joinGame(headerAccessor.getSessionId(), event.nickname(), event.avatar(), gameId);
        sessionGameMappingService.mapSessionToGame(headerAccessor.getSessionId(), gameId);
        gameService.sendUsersState(gameId);
    }

    @MessageMapping("/ToggleReady")
    public void toggleReady(SimpMessageHeaderAccessor headerAccessor) {
        gameService.toggleReady(headerAccessor.getSessionId());
        var sessionGame = sessionGameMappingService.getGameId(headerAccessor.getSessionId());
        gameService.sendUsersState(sessionGame.gameId());
    }

    @MessageMapping("/StartGame")
    public void startGame(SimpMessageHeaderAccessor headerAccessor) {
        var sessionGame = sessionGameMappingService.getGameId(headerAccessor.getSessionId());
        gameService.startGame(sessionGame.gameId());
        gameService.sendGameState(sessionGame.gameId());
    }

    @MessageMapping("/ContinueToQuestion")
    public void continueToQuestion(@Payload ContinueToQuestionEvent event, SimpMessageHeaderAccessor headerAccessor) {
        var sessionGame = sessionGameMappingService.getGameId(headerAccessor.getSessionId());
        gameService.changeQuestionIndex(sessionGame.gameId(), event.nextQuestionIndex());
        gameService.setGameState(sessionGame.gameId(), GameState.QUESTION);
        gameService.sendGameState(sessionGame.gameId());
    }

    @MessageMapping("/SendAnswer")
    public void sendAnswer(@Payload SendAnswerEvent event, SimpMessageHeaderAccessor headerAccessor) {
        var sessionGame = sessionGameMappingService.getGameId(headerAccessor.getSessionId());
        gameService.saveAnswer(sessionGame.gameId(), headerAccessor.getSessionId(), event.questionId(), event.answer());
        gameService.setReady(headerAccessor.getSessionId(), true);
        gameService.sendAnswersHistoryState(sessionGame.gameId());
        gameService.sendUsersState(sessionGame.gameId());
    }
}
