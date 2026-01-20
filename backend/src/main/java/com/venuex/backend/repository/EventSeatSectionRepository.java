package com.venuex.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.venuex.backend.entities.EventSeatSection;

@Repository
public interface EventSeatSectionRepository extends JpaRepository<EventSeatSection, Integer> {

    List<EventSeatSection> findByEvent_Id(Integer eventId);
}
