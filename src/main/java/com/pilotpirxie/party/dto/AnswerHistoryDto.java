package com.pilotpirxie.party.dto;

public record AnswerHistoryDto(
    String id,
    String questionId,
    String userId,
    String answerId,
    String selectedUserId,
    String drawing
) {
}
