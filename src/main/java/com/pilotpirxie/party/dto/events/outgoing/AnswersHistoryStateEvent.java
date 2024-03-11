package com.pilotpirxie.party.dto.events.outgoing;

import com.pilotpirxie.party.dto.AnswerHistoryDto;

import java.util.List;

public record AnswersHistoryStateEvent(
    List<AnswerHistoryDto> answers
) {
}
