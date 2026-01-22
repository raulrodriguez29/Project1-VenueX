package com.venuex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.venuex.backend.entities.EventSeatSection;

@Repository
public interface EventSeatSectionRepository extends JpaRepository<EventSeatSection, Integer> {

    List<EventSeatSection> findByEvent_Id(Integer eventId);

    Optional<EventSeatSection> findByEvent_IdAndSeatSection_Type(
        Integer eventId,
        String type);
}
