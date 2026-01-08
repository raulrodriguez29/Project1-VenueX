package com.venuex.backend.repository;

import com.venuex.backend.entities.venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface venueRepository extends JpaRepository<venue, Integer> {
}
