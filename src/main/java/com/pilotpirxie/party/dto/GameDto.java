package com.pilotpirxie.party.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import java.time.LocalDateTime;

public record GameDto(
    String id,
    String code,
    int questionIndex,
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    LocalDateTime timerTo,
    int timeToAnswer,
    int timeToDraw,
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    LocalDateTime createdAt,
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    LocalDateTime updatedAt
) {}