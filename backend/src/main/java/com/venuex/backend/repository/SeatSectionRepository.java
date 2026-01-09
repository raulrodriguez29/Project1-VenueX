package com.venuex.backend.repository;

import com.venuex.backend.entities.SeatSection;
import com.venuex.backend.entities.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface SeatSectionRepository extends JpaRepository <SeatSection, Integer> {
    
    List<SeatSection> findByVenue(Venue venue);
}
