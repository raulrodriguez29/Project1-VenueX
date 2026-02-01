package com.venuex.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
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
import com.venuex.backend.repository.UserRepository;
import com.venuex.backend.repository.VenueRepository;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private VenueRepository venueRepository;

    @Mock
    private EventSeatSectionRepository eventSeatSectionRepository;

    @Mock
    private SeatSectionRepository seatSectionRepository;

    @Mock
    private EventCleanupService eventCleanupService;

    @InjectMocks
    private EventService eventService;

    Event event;
    Venue venue;
    User user;
    EventSeatSection eventSeatSection;
    SeatSection seatSection;
    
    @BeforeEach
    void setUp() {

        user = new User();
        user.setId(1);
        user.setEmail("temp@gmail.com");
        user.setPasswordHash("temphash");
        user.setFirstName("josh");
        user.setLastName("lian");
        user.setPhone("000-000-0000");

    
        venue = new Venue();
        venue.setId(1);
        venue.setName("temp venue");
        venue.setLocation("templocation");
        venue.setDescription("temp description");


        event = new Event();
        event.setId(1);
        event.setVenue(venue);
        event.setCreatedBy(user);
        event.setName("temp event");
        event.setDescription("temp stadium");
        event.setStartTime(LocalDateTime.now().plusDays(2));
        event.setStatus("OPEN");

        seatSection = new SeatSection();
        seatSection.setId(1);
        seatSection.setType("VIP");
        seatSection.setVenue(venue);
        seatSection.setCapacity(10);

        eventSeatSection = new EventSeatSection();
        eventSeatSection.setId(1);
        eventSeatSection.setEvent(event);
        eventSeatSection.setSeatSection(seatSection);
        eventSeatSection.setPrice(BigDecimal.valueOf(12.00));
        eventSeatSection.setRemainingCapacity(10);
    }

    @Test
    void testGetEventById_Success() {
        when(eventRepository.findById(1)).thenReturn(Optional.of(event));
        EventDTO result = eventService.getEventById(1);
        assertEquals(result.getName(),event.getName());
        assertEquals(result.getVenueName(), event.getVenue().getName());
        verify(eventRepository, times(2)).findById(1);
    }

    @Test
    void testGetEventById_Failure() {
        when(eventRepository.findById(2)).thenReturn(Optional.empty());
        ResponseStatusException exception =
            assertThrows(ResponseStatusException.class, () -> {
                eventService.getEventById(2);
            });

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Event not found", exception.getReason());
        verify(eventRepository, times(1)).findById(2);
    }

    @Test
    void testAddEvent_Success() {
        event.setStartTime(LocalDateTime.now().plusDays(2).withHour(18));

        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        when(userRepository.findByEmail("temp@gmail.com"))
            .thenReturn(Optional.of(user));
        when(eventRepository.findById(1)).thenReturn(Optional.of(event));
        when(eventRepository.existsByName("TEMP EVENT")).thenReturn(false);
        when(eventRepository.save(any(Event.class))).thenReturn(event);
        

        EventDTO result = eventService.addEvent(event, "temp@gmail.com");

        assertNotNull(result);
        assertEquals("TEMP EVENT", result.getName());
        assertEquals("temp venue", result.getVenueName());

        verify(eventRepository, times(2)).save(event);
    }

    @Test
    void testAddEvent_VenueNotFound() {
        when(venueRepository.findById(1)).thenReturn(Optional.empty());
        ResponseStatusException ex =
            assertThrows(ResponseStatusException.class, () -> {
                eventService.addEvent(event, "temp@gmail.com");
            });

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Venue not found", ex.getReason());
        verify(eventRepository, times(0)).findById(1);
    }

    @Test
    void testAddEvent_EventSameDayConflict() {
        event.setStartTime(LocalDateTime.now().plusDays(2).withHour(18));

        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        when(userRepository.findByEmail("temp@gmail.com"))
            .thenReturn(Optional.of(user));
        when(eventRepository.existsByName("TEMP EVENT")).thenReturn(false);
        when(eventRepository.existsEventOnDay(anyInt(), any(), any())).thenReturn(true);

        ResponseStatusException ex =
            assertThrows(ResponseStatusException.class, () -> {
                eventService.addEvent(event, "temp@gmail.com");
            });

        assertEquals(HttpStatus.CONFLICT, ex.getStatusCode());
        assertEquals("This venue already has a concert scheduled for that day", ex.getReason());
        verify(eventRepository, times(0)).findById(1);
        verify(venueRepository, times(1)).findById(1);
    }

    @Test
    void testUpdateEvent_Success() {
        event.setStartTime(LocalDateTime.now().plusDays(2).withHour(18));
        event.setDescription("old desc");

        Event update = new Event();
        update.setName("NEW EVENT NAME");
        update.setDescription("New Description");
        update.setStartTime(LocalDateTime.now().plusDays(3).withHour(19));

        when(eventRepository.findById(1)).thenReturn(Optional.of(event));
        when(eventRepository.existsByName("NEW EVENT NAME")).thenReturn(false);
        when(eventRepository.existsEventOnDayExcludingEvent(anyInt(), any(), any(), eq(1)))
            .thenReturn(false);
        when(eventRepository.save(any(Event.class))).thenReturn(event);
        when(eventRepository.findById(1)).thenReturn(Optional.of(event));

        EventDTO result = eventService.updateEvent(1, update, "temp@gmail.com", "HOST");

        assertNotNull(result);
        assertEquals("NEW EVENT NAME", result.getName());
        verify(eventRepository, times(2)).findById(1);
        verify(eventRepository, times(1)).existsByName("NEW EVENT NAME");
    }

    @Test
    void testUpdateEvent_Failure_EventNotFound() {
        when(eventRepository.findById(99)).thenReturn(Optional.empty());
        ResponseStatusException ex = assertThrows(
            ResponseStatusException.class, () -> eventService.updateEvent(99, new Event(), "temp@gmail.com","HOST"));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Event not found", ex.getReason());
        verify(eventRepository, times(0)).findById(1);
    }

    @Test
    void testGetEventSeatById_Success() {
        when(eventRepository.findById(1)).thenReturn(Optional.of(event));
        when(eventSeatSectionRepository.findByEvent_Id(1))
            .thenReturn(List.of(eventSeatSection));

        List<EventSeatSectionDTO> result = eventService.getEventSeatById(1);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("VIP", result.get(0).getSeatSectionName());
        assertEquals(BigDecimal.valueOf(12.00), result.get(0).getPrice());

        verify(eventRepository, times(1)).findById(1);
        verify(eventSeatSectionRepository, times(1)).findByEvent_Id(1);
    }
    
    @Test
    void testGetEventSeatById_EventNotFound() {

        when(eventRepository.findById(99)).thenReturn(Optional.empty());
        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
            () -> eventService.getEventSeatById(99));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Event not found", ex.getReason());

        verify(eventRepository, times(1)).findById(99);
        verify(eventSeatSectionRepository, never()).findByEvent_Id(any());
    }

    @Test
    void testAddEventSeatSectionPrices_Success() {

        EventSeatSectionDTO dto = new EventSeatSectionDTO();
        dto.setSeatSectionName("VIP");
        dto.setPrice(BigDecimal.valueOf(50.00));

        List<EventSeatSectionDTO> dtos = List.of(dto);

        when(eventRepository.findById(1)).thenReturn(Optional.of(event));
        when(seatSectionRepository.findByTypeAndVenue_Id("VIP",1))
            .thenReturn(Optional.of(seatSection));

        eventService.addEventSeatSectionPrices(1, dtos);

        assertEquals(1, event.getSeatSections().size());
        EventSeatSection savedSection = event.getSeatSections().get(0);

        assertEquals(seatSection, savedSection.getSeatSection());
        assertEquals(BigDecimal.valueOf(50.00), savedSection.getPrice());
        assertEquals(seatSection.getCapacity(), savedSection.getRemainingCapacity());

        verify(eventRepository).save(event);
    }

    @Test
    void testAddEventSeatSectionPrices_EventNotFound() {

        when(eventRepository.findById(1)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class,
            () -> eventService.addEventSeatSectionPrices(1, List.of()));

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Event not found", ex.getReason());

        verify(eventRepository, never()).save(any());
    }

    @Test
    void testUpdateEventSeatSectionPrices_Failure_EventNotFound() { 
 
        when(eventRepository.findById(2)).thenReturn(Optional.empty());

        List<EventSeatSectionDTO> updates = new ArrayList<>();
        EventSeatSectionDTO dto = new EventSeatSectionDTO();
        dto.setSeatSectionName("VIP");
        dto.setPrice(BigDecimal.valueOf(15.00));
        updates.add(dto);

      
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
            () -> eventService.updateEventSeatSectionPrices(2, updates, "temp@gmail.com","HOST"));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertTrue(exception.getReason().contains("Event not found"));
    }   
}
