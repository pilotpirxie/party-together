package com.pilotpirxie.party.mapper;

import com.pilotpirxie.party.dto.AnswerHistoryDto;
import com.pilotpirxie.party.entities.AnswersHistoryEntity;

public class AnswerHistoryMapper {

    public static AnswerHistoryDto toDto(AnswersHistoryEntity entity) {
        if (entity == null) {
            return null;
        }

        var answerId = entity.getAnswerId() == null ? null : entity.getAnswerId().toString();
        var selectedUserId = entity.getSelectedUserId() == null ? null : entity.getSelectedUserId().toString();
        var drawing = entity.getDrawing() == null ? null : entity.getDrawing();

        return new AnswerHistoryDto(
            entity.getId().toString(),
            entity.getQuestionId().toString(),
            entity.getUserId().toString(),
            answerId,
            selectedUserId,
            drawing
        );
    }
}