package com.pilotpirxie.party.mapper;

import com.pilotpirxie.party.dto.UserDto;
import com.pilotpirxie.party.entities.UserEntity;

public class UserMapper {

    public static UserDto toDto(UserEntity entity) {
        if (entity == null) {
            return null;
        }
        return new UserDto(
            entity.getId().toString(),
            entity.getSessionId(),
            entity.getGameId().toString(),
            entity.getNickname(),
            entity.getAvatar(),
            entity.getColor(),
            entity.isReady(),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }
}