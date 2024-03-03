package com.pilotpirxie.party.services;

public interface GameMessagingService {
    void broadcastToGame(String gameId, String topic, Object message);
    void sendToUser(String sessionId, String topic, Object message);
    String getGameId(String sessionId);
}
