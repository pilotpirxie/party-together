package com.pilotpirxie.party.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.InstantSerializer;
import com.pilotpirxie.party.config.LocalDateTimeToUTCStringSerializer;

import java.time.Instant;
import java.time.LocalDateTime;

public record GameDto(
    String id,
    String code,
    int questionIndex,
    String state,
    @JsonSerialize(using = InstantSerializer.class)
    Instant timerTo,
    int timeToAnswer,
    int timeToDraw,
    @JsonSerialize(using = LocalDateTimeToUTCStringSerializer.class)
    LocalDateTime createdAt,
    @JsonSerialize(using = LocalDateTimeToUTCStringSerializer.class)
    LocalDateTime updatedAt
) {}