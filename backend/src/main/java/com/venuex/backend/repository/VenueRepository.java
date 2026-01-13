package com.venuex.backend.repository;

import com.venuex.backend.entities.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue, Integer> {
    boolean existsByName(String name);
}
