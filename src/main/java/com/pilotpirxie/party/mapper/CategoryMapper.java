package com.pilotpirxie.party.mapper;

import com.pilotpirxie.party.dto.CategoryDto;
import com.pilotpirxie.party.entities.CategoryEntity;

public class CategoryMapper {

    public static CategoryDto toDto(CategoryEntity entity) {
        if (entity == null) {
            return null;
        }
        return new CategoryDto(
            entity.getId().toString(),
            entity.getName(),
            entity.getDescription(),
            entity.getBackground(),
            entity.getAudio(),
            entity.getPrimaryColor()
        );
    }
}