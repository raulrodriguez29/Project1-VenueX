package com.venuex.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.venuex.backend.entities.role;

@Repository
public interface roleRepository extends JpaRepository<role, Integer> {

    Optional<role> findByRoleName(String type);
}

