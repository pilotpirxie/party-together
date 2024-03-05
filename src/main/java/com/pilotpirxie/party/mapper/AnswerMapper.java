package com.pilotpirxie.party.mapper;

import com.pilotpirxie.party.dto.AnswerDto;
import com.pilotpirxie.party.entities.AnswerEntity;

public class AnswerMapper {

    public static AnswerDto toDto(AnswerEntity entity) {
        if (entity == null) {
            return null;
        }
        return new AnswerDto(
            entity.getId().toString(),
            entity.getContent(),
            entity.getQuestion() != null ? entity.getQuestion().getId().toString() : null
        );
    }
}