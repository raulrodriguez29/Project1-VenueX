package com.venuex.backend.repository;

import com.venuex.backend.entities.SeatSection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
public interface SeatSectionRepository extends JpaRepository <SeatSection, Integer> {
    
    List<SeatSection> findByVenueId(Integer venueId);
    Optional<SeatSection> findByType(String type);
}
