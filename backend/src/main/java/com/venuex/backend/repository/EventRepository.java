package com.venuex.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.venuex.backend.entities.Event;

public interface EventRepository extends JpaRepository<Event, Integer>{
    @Query("""
        SELECT e FROM Event e
        WHERE (:venueId IS NULL OR e.venue.id = :venueId)
            AND (:name IS NULL OR LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%')))
            AND (:startDate IS NULL OR e.startTime >= :startDate)""")
        List<Event> findEventsByFilters(
            @Param("venueId") Long venueId,
            @Param("name") String name,
            @Param("startDate") LocalDateTime startDate);

    @Query("""
        SELECT COUNT(e) > 0
        FROM Event e
        WHERE e.venue.id = :venueId
            AND e.startTime >= :dayStart
            AND e.startTime < :dayEnd""")
        boolean existsEventOnDay(
            @Param("venueId") Integer venueId,
            @Param("dayStart") LocalDateTime dayStart,
            @Param("dayEnd") LocalDateTime dayEnd);
    
    @Query("""
        SELECT COUNT(e) > 0
        FROM Event e
        WHERE e.venue.id = :venueId
            AND e.startTime >= :dayStart
            AND e.startTime < :dayEnd
            AND e.id <> :eventId""")
        boolean existsEventOnDayExcludingEvent(
            @Param("venueId") Integer venueId,
            @Param("dayStart") LocalDateTime dayStart,
            @Param("dayEnd") LocalDateTime dayEnd,
            @Param("eventId") Integer eventId);

    boolean existsByName(String name);
}
