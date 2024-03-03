package com.pilotpirxie.party.dto;

import java.util.Set;

public record QuestionDto(
    String id,
    int type,
    String categoryId,
    String content,
    Set<AnswerDto> answers
) {
}
