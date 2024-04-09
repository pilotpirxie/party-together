package com.pilotpirxie.party.repositories;

import com.pilotpirxie.party.entities.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface CategoryRepository extends CrudRepository<CategoryEntity, UUID>{
    public Set<CategoryEntity> findAllByIdIn(List<UUID> ids);
    public Set<CategoryEntity> findAllByMode(Integer mode);
}
