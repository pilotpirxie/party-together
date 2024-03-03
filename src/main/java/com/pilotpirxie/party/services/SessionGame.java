package com.pilotpirxie.party.services;

import java.time.LocalDateTime;

public record SessionGame (
    String gameId,
    LocalDateTime createdAt
) {}
