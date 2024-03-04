package com.pilotpirxie.party.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import java.time.LocalDateTime;

public record UserDto(
    String id,
    String sessionId,
    String gameId,
    String nickname,
    String avatar,
    boolean isReady,
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    LocalDateTime createdAt,
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    LocalDateTime updatedAt
) {
}
