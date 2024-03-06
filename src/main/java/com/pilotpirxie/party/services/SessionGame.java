package com.pilotpirxie.party.services;

import java.time.LocalDateTime;
import java.util.UUID;

public record SessionGame (
    UUID gameId,
    LocalDateTime createdAt
) {}
