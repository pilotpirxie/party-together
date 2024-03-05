package com.pilotpirxie.party.repositories;

import com.pilotpirxie.party.entities.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserRepository extends CrudRepository<UserEntity, UUID>{
    Set<UserEntity> findByGameId(UUID gameId);
    Optional<UserEntity> findBySessionId(String sessionId);
    Set<UserEntity> findAllBySessionId(String sessionId);
}
