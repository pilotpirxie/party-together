package com.pilotpirxie.party.controllers;

import com.pilotpirxie.party.dto.GameDto;
import com.pilotpirxie.party.dto.UserDto;
import com.pilotpirxie.party.events.common.PingEvent;
import com.pilotpirxie.party.events.incoming.JoinEvent;
import com.pilotpirxie.party.events.outgoing.JoinedEvent;
import com.pilotpirxie.party.events.outgoing.UsersStateEvent;
import com.pilotpirxie.party.services.GameMessagingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.UUID;

@Controller
public class GameController {
    private final GameMessagingService gameMessagingService;

    public GameController(GameMessagingService gameMessagingService) {
        this.gameMessagingService = gameMessagingService;
    }

    @MessageMapping("/Join")
    public void joinGame(@Payload JoinEvent event, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("Joining game");
        System.out.println(event);

        // check if game exists
        // if yes, add user to game and send Joined event to user and UsersState event to game
        // if no, create game and add user to game and send Joined event to user and UsersState event to game

        var gameId = UUID.randomUUID().toString();
        var game = new GameDto(gameId, "code", 0, null, 0, 0, null, null);
        var users = List.of(new UserDto(UUID.randomUUID().toString(), headerAccessor.getSessionId(), UUID.randomUUID().toString(), "nickname", "avatar", false, null, null));

        String sessionId = headerAccessor.getSessionId();
        gameMessagingService.sendToUser(sessionId, "Joined", new JoinedEvent(game, null, users));
        gameMessagingService.broadcastToGame(gameId, "UsersState", new UsersStateEvent(users));
    }

    @MessageMapping("/Ping")
    public void pingGame(@Payload PingEvent event, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("Pinging game");

        var gameId = gameMessagingService.getGameId(headerAccessor.getSessionId());
        gameMessagingService.broadcastToGame(gameId, "Ping", new PingEvent());
    }
}
