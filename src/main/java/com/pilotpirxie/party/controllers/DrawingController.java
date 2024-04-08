package com.pilotpirxie.party.controllers;

import com.pilotpirxie.party.services.GameService;
import com.pilotpirxie.party.services.SessionGameMappingService;
import com.pilotpirxie.party.services.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class DrawingController {
    private final SessionGameMappingService sessionGameMappingService;
    private final GameService gameService;
    private final StorageService storageService;

    public DrawingController(GameService gameService, SessionGameMappingService sessionGameMappingService, StorageService storageService) {
        this.gameService = gameService;
        this.sessionGameMappingService = sessionGameMappingService;
        this.storageService = storageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(
        @RequestParam("file") MultipartFile file,
        @RequestParam("sessionId") String sessionId,
        @RequestParam("questionId") String questionId
    ) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        if (file.getContentType() == null) {
            return ResponseEntity.badRequest().build();
        }

        if (!file.getContentType().equalsIgnoreCase("image/jpeg")) {
            return ResponseEntity.badRequest().build();
        }

        if (file.getSize() > 1024 * 1024) {
            return ResponseEntity.badRequest().build();
        }

        var originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            var newFilename = storageService.store(file.getInputStream());
            var sessionGame = sessionGameMappingService.getGameId(sessionId);
            gameService.saveAnswer(sessionGame.gameId(), sessionId, questionId, newFilename);
            gameService.setReady(sessionId, true);
            gameService.sendAnswersHistoryState(sessionGame.gameId());
            gameService.sendUsersState(sessionGame.gameId());

            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
