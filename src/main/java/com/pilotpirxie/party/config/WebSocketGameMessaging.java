package com.pilotpirxie.party.config;

import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketGameMessaging implements GameMessaging {
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketGameMessaging(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public void broadcastToGame(String gameId, String topic, Object message) {
        System.out.println("Broadcasting to /topic/" + gameId + "/" + topic + " message: " + message);
        messagingTemplate.convertAndSend("/topic/" + gameId + "/" + topic, message);
    }

    @Override
    public void sendToUser(String sessionId, String topic, Object message) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);

        System.out.println("Sending to /queue/" + sessionId + "/" + topic + " message: " + message);
        messagingTemplate.convertAndSendToUser(sessionId, "/queue/" + topic, message, headerAccessor.getMessageHeaders());
    }
}
