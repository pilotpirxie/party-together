package com.pilotpirxie.party.repositories;

import com.pilotpirxie.party.entities.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface UserRepository extends CrudRepository<UserEntity, UUID>{
}
