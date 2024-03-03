package com.pilotpirxie.party.events.incoming;

public record JoinEvent(
    String nickname,
    Integer avatar,
    String code
) {
}
