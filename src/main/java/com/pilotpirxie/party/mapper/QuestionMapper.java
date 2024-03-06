package com.pilotpirxie.party.mapper;

import com.pilotpirxie.party.dto.AnswerDto;
import com.pilotpirxie.party.dto.QuestionDto;
import com.pilotpirxie.party.entities.QuestionEntity;

import java.util.Set;

public class QuestionMapper {
    public static QuestionDto toDto(QuestionEntity entity, Set<AnswerDto> answers) {
        if (entity == null) {
            return null;
        }

        return new QuestionDto(
            entity.getId().toString(),
            entity.getType().toString(),
            entity.getCategoryId().toString(),
            entity.getContent(),
            answers
        );
    }
}