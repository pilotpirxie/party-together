package com.pilotpirxie.party.repositories;

import com.pilotpirxie.party.entities.AnswersHistoryEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;
import java.util.UUID;

public interface AnswersHistoryRepository extends CrudRepository<AnswersHistoryEntity, UUID>{
    Set<AnswersHistoryEntity> findByQuestionId(UUID questionId);
    Set<AnswersHistoryEntity> findAllByGameId(UUID gameId);
}
