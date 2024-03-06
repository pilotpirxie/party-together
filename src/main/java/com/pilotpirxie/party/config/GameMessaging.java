package com.pilotpirxie.party.config;

public interface GameMessaging {
    void broadcastToGame(String gameId, String topic, Object message);
    void sendToUser(String sessionId, String topic, Object message);
}
