package com.pilotpirxie.party.dto;

import java.time.LocalDateTime;

public record GameDto(
    String id,
    String code,
    int questionIndex,
    LocalDateTime timerTo,
    int timeToAnswer,
    int timeToDraw,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}