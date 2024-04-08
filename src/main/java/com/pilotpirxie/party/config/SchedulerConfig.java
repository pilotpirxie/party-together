package com.pilotpirxie.party.config;

import com.pilotpirxie.party.services.SessionGameMappingService;
import com.pilotpirxie.party.services.StorageService;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
@Configuration
public class SchedulerConfig {
    private final SessionGameMappingService sessionGameMappingService;
    private final StorageService storageService;

    public SchedulerConfig(SessionGameMappingService sessionGameMappingService, StorageService storageService) {
        this.sessionGameMappingService = sessionGameMappingService;
        this.storageService = storageService;
    }

    @Scheduled(fixedRate = 1000)
    public void cleanUpStaleSessions() {
        sessionGameMappingService.cleanUpStaleSessions();
    }

    @Scheduled(fixedRate = 1000)
    public void cleanUpStaleFiles() {
        storageService.cleanupOldFiles();
    }
}
