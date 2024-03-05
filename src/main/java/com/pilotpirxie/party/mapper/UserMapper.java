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
            entity.getGame() != null ? entity.getGame().getId().toString() : null,
            entity.getNickname(),
            entity.getAvatar(),
            entity.isReady(),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }
}