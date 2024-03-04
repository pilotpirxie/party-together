package com.pilotpirxie.party.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.pilotpirxie.party.config.LocalDateTimeToUTCStringSerializer;

import java.time.LocalDateTime;

public record UserDto(
    String id,
    String sessionId,
    String gameId,
    String nickname,
    String avatar,
    boolean isReady,
    @JsonSerialize(using = LocalDateTimeToUTCStringSerializer.class)
    LocalDateTime createdAt,
    @JsonSerialize(using = LocalDateTimeToUTCStringSerializer.class)
    LocalDateTime updatedAt
) {
}
