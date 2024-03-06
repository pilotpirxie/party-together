package com.pilotpirxie.party.repositories;

import com.pilotpirxie.party.entities.QuestionEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;
import java.util.UUID;

public interface QuestionRepository extends CrudRepository<QuestionEntity, UUID>{
    Set<QuestionEntity> findByCategoryId(UUID categoryId);
    Set<QuestionEntity> findAllByCategoryIdIn(Set<UUID> categoryIds);
}
