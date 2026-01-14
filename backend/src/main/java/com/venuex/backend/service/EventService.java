package com.venuex.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.EventDTO;
import com.venuex.backend.DTO.EventSeatSectionDTO;
import com.venuex.backend.entities.Event;
import com.venuex.backend.entities.EventSeatSection;
import com.venuex.backend.entities.SeatSection;
import com.venuex.backend.repository.EventRepository;
import com.venuex.backend.repository.EventSeatSectionRepository;
import com.venuex.backend.repository.SeatSectionRepository;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final SeatSectionRepository seatSectionRepository;
    private final EventSeatSectionRepository eventSeatSectionRepository;

    public EventService(EventRepository eventRepository, SeatSectionRepository seatSectionRepository, EventSeatSectionRepository eventSeatSectionRepository) {
        this.eventRepository = eventRepository;
        this.seatSectionRepository = seatSectionRepository;
        this.eventSeatSectionRepository = eventSeatSectionRepository;
    }

    public List<EventDTO> getEvents(Long venueId, String name, LocalDateTime startDate) {
        List<Event> events = eventRepository.findEventsByFilters(venueId, name, startDate);
         return events.stream()
            .peek(event -> event.setStatus(eventStatus(event.getId())))
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public EventDTO getEventById (Integer id) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        event.setStatus(eventStatus(id));
        return convertToDTO(event);
    }

    public EventDTO addEvent(Event event) {
        if(eventRepository.existsByName(event.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Event already exists");
        }

        LocalDate eventDate = event.getStartTime().toLocalDate();
        LocalDateTime dayStart = eventDate.atStartOfDay();
        LocalDateTime dayEnd = eventDate.plusDays(1).atStartOfDay();

        boolean exists = eventRepository.existsEventOnDay(event.getVenue().getId(),dayStart,dayEnd);

        if (exists) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"This venue already has a concert scheduled for that day");
        }

        Event saved = eventRepository.save(event);
        eventStatus(saved.getId());
        return convertToDTO(saved);
    }

    public EventDTO updateEvent(Integer id, Event event) {
        Event existingEvent = eventRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        LocalDate eventDate = event.getStartTime().toLocalDate();
        LocalDateTime dayStart = eventDate.atStartOfDay();
        LocalDateTime dayEnd = eventDate.plusDays(1).atStartOfDay();

        boolean conflict = eventRepository.existsEventOnDayExcludingEvent(
            event.getVenue().getId(),
            dayStart,
            dayEnd,
            id);
        
        if (conflict) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"This venue already has a concert scheduled for that day");
        }

        existingEvent.setVenue(event.getVenue());
        existingEvent.setName(event.getName());
        existingEvent.setDescription(event.getDescription());
        existingEvent.setStartTime(event.getStartTime());

        Event updatedEvent = eventRepository.save(existingEvent);
        updatedEvent.setStatus(eventStatus(id));
        return convertToDTO(updatedEvent);
    }

    public void deleteEvent(Integer id) {
        Event existingEvent = eventRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        eventRepository.delete(existingEvent);
    }

    public String eventStatus(Integer eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        LocalDateTime now = LocalDateTime.now();
        boolean after2Hours = now.isAfter(event.getStartTime().plusHours(2));
        boolean isSoldOut = event.getSeatSections().stream()
            .allMatch(section -> section.getRemainingCapacity() == 0);

        String newStatus = (after2Hours || isSoldOut) ? "CLOSED" : "OPEN";

        if (!newStatus.equals(event.getStatus())) {
            event.setStatus(newStatus);
            eventRepository.save(event);
        }
        return newStatus;
    }

    public void addEventSeatSectionPrices(Integer id, List<EventSeatSectionDTO> eventSeatSections) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        if (event.getSeatSections() != null && !event.getSeatSections().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Event seat section already set");
        }

        List<EventSeatSection> sections = new ArrayList<>();

        for (EventSeatSectionDTO dto : eventSeatSections) {
            SeatSection seatSection = seatSectionRepository.findById(dto.getSeatSectionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event seat section not found"));
            EventSeatSection ess = new EventSeatSection();
            ess.setEvent(event);                     
            ess.setSeatSection(seatSection);
            ess.setPrice(dto.getPrice());
            ess.setRemainingCapacity(seatSection.getCapacity());

            sections.add(ess);
        }
        event.setSeatSections(sections);
        eventRepository.save(event);
    }

    public List<EventSeatSectionDTO> getEventSeatById(Integer id) {
        if (!eventRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found");
        }  
        List<EventSeatSection> sections = eventSeatSectionRepository.findByEventId(id);
        return sections.stream()
            .map(section -> new EventSeatSectionDTO(
                section.getSeatSection().getId(),
                section.getSeatSection().getType(),
                section.getPrice()))
            .collect(Collectors.toList());
    }

    private EventDTO convertToDTO(Event event) {
        return new EventDTO(
            event.getVenue().getName(),
            event.getName(),
            event.getDescription(),
            event.getStartTime(),
            event.getStatus());
    }
}
