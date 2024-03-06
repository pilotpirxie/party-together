package com.pilotpirxie.party.config;

import com.pilotpirxie.party.dto.events.outgoing.UsersStateEvent;
import com.pilotpirxie.party.entities.UserEntity;
import com.pilotpirxie.party.mapper.UserMapper;
import com.pilotpirxie.party.repositories.UserRepository;
import com.pilotpirxie.party.services.GameMessagingService;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEvents {
    private final GameMessagingService gameMessagingService;
    private final UserRepository userRepository;

    public WebSocketEvents(GameMessagingService gameMessagingService, UserRepository userRepository) {
        this.gameMessagingService = gameMessagingService;
        this.userRepository = userRepository;
    }

    @EventListener
    public void handleSessionConnectedEvent(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        System.out.println("Received a new web socket connection - Session ID: " + sessionId);
    }

    @EventListener
    public void handleSessionDisconnectedEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        System.out.println("User Disconnected - Session ID: " + sessionId);

        var users = userRepository.findAllBySessionId(sessionId);
        for (var user : users) {
            user.setConnected(false);
            userRepository.save(user);

            var gameId = user.getGameId();
            var usersListDto = userRepository.findAllByGameId(gameId).stream().filter(UserEntity::isConnected).map(UserMapper::toDto).toList();
            var usersStateEvent = new UsersStateEvent(usersListDto);
            gameMessagingService.broadcastToGame(gameId.toString(), "UsersState", usersStateEvent);
        }
    }
}
