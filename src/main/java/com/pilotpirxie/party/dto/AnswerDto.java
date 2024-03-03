package com.pilotpirxie.party.dto;

public record AnswerDto(
    String id,
    String content,
    int questionId,
    boolean isCorrect
) {
}
