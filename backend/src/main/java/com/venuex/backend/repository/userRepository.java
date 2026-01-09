package com.venuex.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.venuex.backend.entities.user;

public interface userRepository extends JpaRepository<user, Integer> {

    Optional<user> findByEmail(String email);

    boolean existsByEmail(String email);
}

