package com.pilotpirxie.party;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEvents {
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
    }
}
