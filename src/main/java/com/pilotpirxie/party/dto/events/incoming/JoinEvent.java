package com.pilotpirxie.party.dto.events.incoming;

public record JoinEvent(
    String nickname,
    Integer avatar,
    String code
) {
}
