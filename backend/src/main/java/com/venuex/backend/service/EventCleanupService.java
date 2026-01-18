package com.venuex.backend.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.venuex.backend.repository.EventRepository;

import jakarta.transaction.Transactional;

@Service
public class EventCleanupService {

    private final EventRepository eventRepository;

    public EventCleanupService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Transactional
    public void cleanupExpiredEvents() {
        LocalDateTime cutoff = LocalDateTime.now().minusHours(5);
        eventRepository.deleteExpiredEvents(cutoff);
    }
}
