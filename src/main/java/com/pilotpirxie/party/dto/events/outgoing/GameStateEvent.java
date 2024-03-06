package com.pilotpirxie.party.dto.events.outgoing;

import com.pilotpirxie.party.dto.GameDto;

public record GameStateEvent(
    GameDto game
) {
}
