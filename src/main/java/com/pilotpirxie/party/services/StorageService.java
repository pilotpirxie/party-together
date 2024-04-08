package com.pilotpirxie.party.services;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class StorageService {
    private final Path rootLocation = Paths.get("uploads");

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage location", e);
        }
    }

    public String store(InputStream file) throws IOException {
        var newFilename = UUID.randomUUID() + ".jpg";
        Files.copy(file, rootLocation.resolve(newFilename));
        return newFilename;
    }

    public void cleanupOldFiles() {
        try (Stream<Path> files = Files.walk(rootLocation)) {
            files.forEach(file -> {
                try {
                    if (Files.isRegularFile(file) && isOlderThanOneHour(file)) {
                        Files.delete(file);
                    }
                } catch (IOException e) {
                    System.out.println("Could not delete file: " + file);
                }
            });
        } catch (IOException e) {
            System.out.println("Could not walk through files");
        }
    }

    private boolean isOlderThanOneHour(Path file) throws IOException {
        long currentTime = System.currentTimeMillis();
        long lastModifiedTime = Files.getLastModifiedTime(file).toMillis();
        return (currentTime - lastModifiedTime) > 3600000;
    }
}
