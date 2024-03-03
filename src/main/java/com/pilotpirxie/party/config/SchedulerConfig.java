package com.pilotpirxie.party.config;

import com.pilotpirxie.party.services.SessionGameMappingService;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
@Configuration
public class SchedulerConfig {
    private final SessionGameMappingService sessionGameMappingService;

    public SchedulerConfig(SessionGameMappingService sessionGameMappingService) {
        this.sessionGameMappingService = sessionGameMappingService;
    }

    @Scheduled(fixedRate = 1000)
    public void cleanUpStaleSessions() {
        sessionGameMappingService.cleanUpStaleSessions();
    }
}
