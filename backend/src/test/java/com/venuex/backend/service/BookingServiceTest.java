package com.venuex.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.BookingDTO;
import com.venuex.backend.entities.Booking;
import com.venuex.backend.entities.Event;
import com.venuex.backend.entities.Ticket;
import com.venuex.backend.entities.User;
import com.venuex.backend.entities.Venue;
import com.venuex.backend.repository.BookingRepository;
import com.venuex.backend.repository.EventRepository;
import com.venuex.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private BookingService bookingService;

    private Booking booking;

    @BeforeEach
    void setUp() {
        User user = new User();
        user.setId(10);
        user.setEmail("temp@gmail.com");
        user.setPasswordHash("temphash");
        user.setFirstName("josh");
        user.setLastName("lian");
        user.setPhone("000-000-0000");

        Venue venue = new Venue();
        venue.setId(1);
        venue.setName("temp venue");
        venue.setLocation("templocation");
        venue.setDescription("temp description");


        Event event = new Event();
        event.setId(20);
        event.setVenue(venue);
        event.setCreatedBy(user);
        event.setName("temp event");
        event.setDescription("temp stadium");
        event.setStartTime(LocalDateTime.now().plusDays(2));
        event.setStatus("OPEN");

        booking = new Booking();
        booking.setId(1);
        booking.setUser(user);
        booking.setEvent(event);
        booking.setStatus(Booking.BookingStatus.BOOKED);
        booking.setBookedAt(LocalDateTime.now());
    }


    // Create booking tests
    @Test
    void createBooking_success() {
        when(userRepository.findByEmail("temp@gmail.com")).thenReturn(Optional.of(booking.getUser()));
        when(eventRepository.findById(20)).thenReturn(Optional.of(booking.getEvent()));
        when(bookingRepository.save(any(Booking.class))).thenAnswer(invocation -> {
            Booking b = invocation.getArgument(0);
            b.setId(100); 
            return b;});

        Integer bookingId = bookingService.createBooking(20, "temp@gmail.com");

        assertNotNull(bookingId);
        assertEquals(100, bookingId);
        verify(bookingRepository).save(any(Booking.class));
    }

    @Test
    void createBooking_failure_userNotFound() {
        when(userRepository.findByEmail("missing@gmail.com")).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
            bookingService.createBooking(20, "missing@gmail.com"));

        assertEquals("User not found", exception.getReason());
        verify(bookingRepository, never()).save(any());
    }

    // Get booking by User
    @Test
    void getUserBooking_success() {

        User mockUser = booking.getUser();
        when(userRepository.findByEmail("temp@gmail.com")).thenReturn(Optional.of(mockUser));

        Ticket ticket1 = new Ticket();
        ticket1.setPrice(BigDecimal.valueOf(50));
        Ticket ticket2 = new Ticket();
        ticket2.setPrice(BigDecimal.valueOf(25));
        booking.setTickets(List.of(ticket1, ticket2));
        when(bookingRepository.findByUserId(mockUser.getId()))
            .thenReturn(List.of(booking));

        List<BookingDTO> bookingDTOs = bookingService.getUserBooking("temp@gmail.com");

        assertNotNull(bookingDTOs);
        assertEquals(1, bookingDTOs.size());

        BookingDTO dto = bookingDTOs.get(0);
        assertEquals(booking.getId(), dto.getId());
        assertEquals(booking.getEvent().getName(), dto.getEventId());
        assertEquals(booking.getBookedAt(), dto.getBookedAt());
        verify(userRepository).findByEmail("temp@gmail.com");
        verify(bookingRepository).findByUserId(mockUser.getId());
    }


    @Test
    void getUserBooking_userNotFound() {
        when(userRepository.findByEmail("missing@gmail.com")).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
            bookingService.getUserBooking("missing@gmail.com"));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("User not found", exception.getReason());

        verify(bookingRepository, never()).findByUserId(any());
    }
}