package com.pilotpirxie.party.services;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionGameMappingService {
    private final ConcurrentHashMap<String, SessionGame> sessionGameMap = new ConcurrentHashMap<>();

    public void mapSessionToGame(String sessionId, String gameId) {
        var now = java.time.LocalDateTime.now();
        sessionGameMap.put(sessionId, new SessionGame(gameId, now));
    }

    public SessionGame getGameId(String sessionId) {
        return sessionGameMap.get(sessionId);
    }

    public void removeSession(String sessionId) {
        sessionGameMap.remove(sessionId);
    }

    public void cleanUpStaleSessions() {
        var now = java.time.LocalDateTime.now();
        sessionGameMap.entrySet().removeIf(entry -> entry.getValue().createdAt().isBefore(now.minusHours(6)));
    }
}