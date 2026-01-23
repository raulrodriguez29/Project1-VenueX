package com.venuex.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.EventDTO;
import com.venuex.backend.DTO.EventSeatSectionDTO;
import com.venuex.backend.entities.Event;
import com.venuex.backend.entities.EventSeatSection;
import com.venuex.backend.entities.SeatSection;
import com.venuex.backend.entities.User;
import com.venuex.backend.entities.Venue;
import com.venuex.backend.repository.EventRepository;
import com.venuex.backend.repository.EventSeatSectionRepository;
import com.venuex.backend.repository.SeatSectionRepository;
import com.venuex.backend.repository.VenueRepository;

import com.venuex.backend.repository.UserRepository;;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final SeatSectionRepository seatSectionRepository;
    private final EventSeatSectionRepository eventSeatSectionRepository;
    private final VenueRepository venueRepository;
    private final UserRepository userRepository;
    private final EventCleanupService eventCleanupService;

    public EventService(
        EventRepository eventRepository, 
        SeatSectionRepository seatSectionRepository, 
        EventSeatSectionRepository eventSeatSectionRepository,
        VenueRepository venueRepository,
        UserRepository userRepository,
        EventCleanupService eventCleanupService) {
            this.eventRepository = eventRepository;
            this.seatSectionRepository = seatSectionRepository;
            this.eventSeatSectionRepository = eventSeatSectionRepository;
            this.venueRepository = venueRepository;
            this.userRepository = userRepository;
            this.eventCleanupService = eventCleanupService;
    }

    public List<EventDTO> getEvents(Integer venueId, String name) {
        eventCleanupService.cleanupExpiredEvents();
        if (name != null && !name.isBlank()) {
            name = "%" + name.toLowerCase() + "%"; 
        } else {name = null;}

        List<Event> events = eventRepository.findEventsByFilters(venueId, name);

        if(events.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"No events found for given filters");
        }

        return events.stream()
            .peek(event -> event.setStatus(eventStatus(event.getId())))
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public EventDTO getEventById (Integer id) {
        eventCleanupService.cleanupExpiredEvents();
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        event.setStatus(eventStatus(id));
        return convertToDTO(event);
    }

    public EventDTO addEvent(Event event, String hostEmail) {
        eventCleanupService.cleanupExpiredEvents();
        Integer venueId = event.getVenue().getId();
        Venue venue = venueRepository.findById(venueId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venue not found"));
        event.setVenue(venue);

        User user = userRepository.findByEmail(hostEmail)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        event.setCreatedBy(user);

        if(eventRepository.existsByName(event.getName().toLowerCase())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Event already exists");
        }

        validateEventStartTime(event.getStartTime());
        LocalDate eventDate = event.getStartTime().toLocalDate();
        LocalDateTime dayStart = eventDate.atStartOfDay();
        LocalDateTime dayEnd = eventDate.plusDays(1).atStartOfDay();
        boolean exists = eventRepository.existsEventOnDay(event.getVenue().getId(),dayStart,dayEnd);
        if (exists) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"This venue already has a concert scheduled for that day");
        }

        if (event.getName() != null) event.setName(event.getName().toLowerCase());
        if (event.getDescription() != null) event.setDescription(event.getDescription().toLowerCase());
        Event saved = eventRepository.save(event);
        eventStatus(saved.getId());
        return convertToDTO(saved);
    }

    public EventDTO updateEvent(Integer id, Event event, String hostEmail, String role) {
        eventCleanupService.cleanupExpiredEvents();

        Event existingEvent = eventRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        
        if (!existingEvent.getCreatedBy().getEmail().equals(hostEmail) && !role.equals("ADMIN")) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Not correct user ");
        }
        //name
        if (event.getName() != null) {
            String newName = event.getName().toLowerCase();
            if (!existingEvent.getName().equals(newName) && eventRepository.existsByName(newName)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Event already exists");
            }
            existingEvent.setName(newName);
        }
        //start time
        if (event.getStartTime() != null) {
            validateEventStartTime(event.getStartTime());
            LocalDate eventDate = event.getStartTime().toLocalDate();
            LocalDateTime dayStart = eventDate.atStartOfDay();
            LocalDateTime dayEnd = eventDate.plusDays(1).atStartOfDay();

            boolean conflict = eventRepository.existsEventOnDayExcludingEvent(
                existingEvent.getVenue().getId(),
                dayStart,
                dayEnd,
                id);

            if (conflict) {
                throw new ResponseStatusException(HttpStatus.CONFLICT,"This venue already has a concert scheduled for that day");
            }

            existingEvent.setStartTime(event.getStartTime());
        }
        if (event.getDescription() != null) existingEvent.setDescription(event.getDescription().toLowerCase());
        Event updatedEvent = eventRepository.save(existingEvent);
        updatedEvent.setStatus(eventStatus(id));
        return convertToDTO(updatedEvent);
    }

    public void deleteEvent(Integer id, String hostEmail, String role) {
        eventCleanupService.cleanupExpiredEvents();
        Event existingEvent = eventRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
    
        if (!existingEvent.getCreatedBy().getEmail().equals(hostEmail) && !role.equals("ADMIN")) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Not correct user ");
        }
        eventRepository.delete(existingEvent);
    }

    /*================================================================================================= */
    /* Event Seat Sections */

    public List<EventSeatSectionDTO> getEventSeatById(Integer id) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found")); 
        List<EventSeatSection> sections = eventSeatSectionRepository.findByEvent_Id(event.getId());
        return sections.stream()
            .map(section -> new EventSeatSectionDTO(
                section.getSeatSection().getType(),
                section.getPrice(),
                section.getRemainingCapacity()))
            .collect(Collectors.toList());
    }

    public void addEventSeatSectionPrices(Integer id, List<EventSeatSectionDTO> eventSeatSections) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
                
        if (event.getSeatSections() != null && !event.getSeatSections().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Event seat section already set");
        }

        for (EventSeatSectionDTO dto : eventSeatSections) {

            SeatSection seatSection = seatSectionRepository.findByTypeAndVenue_Id(dto.getSeatSectionName(), event.getVenue().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seat section not found"));

            EventSeatSection ess = new EventSeatSection();
            ess.setEvent(event);
            ess.setSeatSection(seatSection);
            ess.setPrice(dto.getPrice());
            ess.setRemainingCapacity(seatSection.getCapacity());

            event.getSeatSections().add(ess);
        }
        eventRepository.save(event);
    }

    public List<EventSeatSectionDTO> updateEventSeatSectionPrices(Integer eventId, List<EventSeatSectionDTO> eventSeatSections, String hostEmail, String role) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        if (!event.getCreatedBy().getEmail().equals(hostEmail) && !role.equals("ADMIN")) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Not correct user ");
        }

        if (event.getSeatSections() == null || event.getSeatSections().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No seat sections exist for this event");
        }

        for (EventSeatSectionDTO dto : eventSeatSections) {
            Optional<EventSeatSection> existingSectionOpt = event.getSeatSections().stream()
                .filter(ess -> ess.getSeatSection().getType().equals(dto.getSeatSectionName()))
                .findFirst();

            if (existingSectionOpt.isPresent()) {
                existingSectionOpt.get().setPrice(dto.getPrice());
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Seat section not found: ");
            }
        } 
        eventRepository.save(event);
        List<EventSeatSection> sections = eventSeatSectionRepository.findByEvent_Id(event.getId());
        return sections.stream()
            .map(section -> new EventSeatSectionDTO(
                section.getSeatSection().getType(),
                section.getPrice(),
                section.getRemainingCapacity()))
            .collect(Collectors.toList());
    }


     /*================================================================================================= */
    /* Helpers */
    private EventDTO convertToDTO(Event event) {
        return new EventDTO(
            event.getId(),
            event.getVenue().getName(),
            event.getName(),
            event.getDescription(),
            event.getStartTime(),
            event.getStatus());
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

    private void validateEventStartTime(LocalDateTime startTime) {
        if (startTime == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start time is required");
        }

        LocalDateTime now = LocalDateTime.now();

        // Must be at least 1 day after today
        if (!startTime.isAfter(now.plusDays(1))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Event must be scheduled at least 1 day in advance");
        }

        LocalTime time = startTime.toLocalTime();

        // Allowed time window: 8:00 AM – 10:00 PM
        LocalTime earliest = LocalTime.of(8, 0);
        LocalTime latest = LocalTime.of(22, 0);

        if (time.isBefore(earliest) || time.isAfter(latest)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Event start time must be between 8:00 AM and 10:00 PM");
        }
    }
}
