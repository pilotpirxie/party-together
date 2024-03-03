package com.pilotpirxie.party.repositories;

import com.pilotpirxie.party.entities.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface CategoryRepository extends CrudRepository<CategoryEntity, UUID>{
}
