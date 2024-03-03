package com.pilotpirxie.party.repositories;

import com.pilotpirxie.party.entities.GameEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface GameRepository extends CrudRepository<GameEntity, UUID>{
    Optional<GameEntity> findByCode(String code);
}
