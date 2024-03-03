package com.pilotpirxie.party.dto;

import java.time.LocalDateTime;

public record UserDto(
    String id,
    String sessionId,
    String gameId,
    String nickname,
    String avatar,
    boolean isReady,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
}
