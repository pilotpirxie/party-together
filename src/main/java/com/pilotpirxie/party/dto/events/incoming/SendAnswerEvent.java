package com.pilotpirxie.party.dto.events.incoming;

public record SendAnswerEvent(
    String questionId,
    String answer
) {
}
