package com.pilotpirxie.party.dto.events.incoming;

public record ContinueToQuestionEvent(
    Integer nextQuestionIndex
) {
}
