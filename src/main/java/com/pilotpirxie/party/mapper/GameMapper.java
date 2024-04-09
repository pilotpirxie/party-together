package com.pilotpirxie.party.mapper;

import com.pilotpirxie.party.dto.GameDto;
import com.pilotpirxie.party.entities.GameEntity;

public class GameMapper {

    public static GameDto toDto(GameEntity entity) {
        if (entity == null) {
            return null;
        }
        return new GameDto(
            entity.getId().toString(),
            entity.getCode(),
            entity.getQuestionIndex(),
            entity.getState().toString(),
            entity.getTimerTo(),
            entity.getTimeToAnswer(),
            entity.getTimeToDraw(),
            entity.getNicknamesForQuestions(),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }
}