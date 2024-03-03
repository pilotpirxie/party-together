package com.pilotpirxie.party.services;

import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class GameMessagingServiceImpl implements GameMessagingService {
    private final SimpMessagingTemplate messagingTemplate;

    public GameMessagingServiceImpl(SimpMessagingTemplate messagingTemplate) {
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

        messagingTemplate.convertAndSendToUser(sessionId, "/queue/" + topic, message, headerAccessor.getMessageHeaders());
    }

    @Override
    public String getGameId(String sessionId) {
        // implement this method
        return "";
    }
}
