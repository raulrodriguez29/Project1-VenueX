package com.venuex.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.venuex.backend.entities.Event;

public interface EventRepository extends JpaRepository<Event, Integer>{
    @Query("""
        SELECT e FROM Event e
        WHERE (:venueId IS NULL OR e.venue.id = :venueId)
            AND (:name IS NULL OR e.name LIKE :name)""")
        List<Event> findEventsByFilters(
            @Param("venueId") Integer venueId,
            @Param("name") String name);

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
    
    @Modifying
    @Query("""
        DELETE FROM Event e
        WHERE e.startTime <= :cutoff""")
        void deleteExpiredEvents(@Param("cutoff") LocalDateTime cutoff);

    boolean existsByName(String name);
}
