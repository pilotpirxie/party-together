package com.pilotpirxie.party.repositories;

import com.pilotpirxie.party.entities.AnswerEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface AnswerRepository extends CrudRepository<AnswerEntity, UUID>{
    Set<AnswerEntity> findByQuestionId(UUID questionId);
    Set<AnswerEntity> findAllByQuestionIdIn(List<UUID> questionIds);
}
