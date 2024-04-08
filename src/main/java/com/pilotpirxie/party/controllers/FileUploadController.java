package com.pilotpirxie.party.controllers;

import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
public class FileUploadController {
    private final Path rootLocation = Paths.get("uploads");

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage location", e);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(
        @RequestParam("file") MultipartFile file,
        @RequestParam("sessionId") String sessionId
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

        try {
            var originalFilename = file.getOriginalFilename();
            if (originalFilename == null || originalFilename.isBlank()) {
                return ResponseEntity.badRequest().build();
            }
            var newFilename = sessionId + '_' + UUID.randomUUID() + ".jpg";
            Files.copy(file.getInputStream(), this.rootLocation.resolve(newFilename));
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
