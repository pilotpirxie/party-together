package com.pilotpirxie.party.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.pilotpirxie.party.config.LocalDateTimeToUTCStringSerializer;

import java.time.LocalDateTime;

public record GameDto(
    String id,
    String code,
    int questionIndex,
    String currentCategoryId,
    String state,
    @JsonSerialize(using = LocalDateTimeToUTCStringSerializer.class)
    LocalDateTime timerTo,
    int timeToAnswer,
    int timeToDraw,
    @JsonSerialize(using = LocalDateTimeToUTCStringSerializer.class)
    LocalDateTime createdAt,
    @JsonSerialize(using = LocalDateTimeToUTCStringSerializer.class)
    LocalDateTime updatedAt
) {}