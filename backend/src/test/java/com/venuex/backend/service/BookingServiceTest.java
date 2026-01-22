package com.venuex.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import com.venuex.backend.entities.Booking;
import com.venuex.backend.entities.Booking.BookingStatus;
import com.venuex.backend.entities.Event;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.BookingRepository;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {
/*
    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private BookingService bookingService;

    private Booking booking;

    @BeforeEach
void setUp() {
    User user = new User();
    user.setId(10);

    Event event = new Event();
    event.setId(20);

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
        when(bookingRepository.save(any(Booking.class))).thenReturn(booking);

        Booking result = bookingService.createBooking(10, 20);

        assertNotNull(result);
        assertEquals(BookingStatus.BOOKED, result.getStatus());
        verify(bookingRepository).save(any(Booking.class));
    }

    @Test
    void createBooking_nullUserId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> bookingService.createBooking(null, 20));
    }

    @Test
    void createBooking_nullEventId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> bookingService.createBooking(10, null));
    }

    @Test
    void createBooking_negativeUserId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> bookingService.createBooking(-1, 20));
    }

    @Test
    void createBooking_negativeEventId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> bookingService.createBooking(10, -5));
    }

    // Get booking by ID
    @Test
    void getBookingById_success() {
        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));

        Booking result = bookingService.getBookingById(1);

        assertEquals(1, result.getId());
        verify(bookingRepository).findById(1);
    }

    @Test
    void getBookingById_notFound_throwsException() {
        when(bookingRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class,
                () -> bookingService.getBookingById(1));
    }

    @Test
    void getBookingById_nullId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> bookingService.getBookingById(null));
    }

    // Get bookings by User
    @Test
    void getBookingsByUser_success() {
        when(bookingRepository.findByUserId(10))
                .thenReturn(List.of(booking));

        List<Booking> results = bookingService.getBookingsByUser(10);

        assertEquals(1, results.size());
        verify(bookingRepository).findByUserId(10);
    }

    @Test
    void getBookingsByUser_emptyList() {
        when(bookingRepository.findByUserId(10))
                .thenReturn(Collections.emptyList());

        List<Booking> results = bookingService.getBookingsByUser(10);

        assertNotNull(results);
        assertTrue(results.isEmpty());
    }

    @Test
    void getBookingsByUser_nullUserId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> bookingService.getBookingsByUser(null));
    }

    // Cancel bookings
    @Test
    void cancelBooking_success() {
        when(bookingRepository.findById(1))
                .thenReturn(Optional.of(booking));

        bookingService.cancelBooking(1);

        assertEquals(BookingStatus.CANCELED, booking.getStatus());
        verify(bookingRepository).save(booking);
    }

    @Test
    void cancelBooking_alreadyCanceled_throwsException() {
        booking.setStatus(BookingStatus.CANCELED);

        when(bookingRepository.findById(1))
                .thenReturn(Optional.of(booking));

        assertThrows(IllegalStateException.class,
                () -> bookingService.cancelBooking(1));
    }

    @Test
    void cancelBooking_notFound_throwsException() {
        when(bookingRepository.findById(1))
                .thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class,
                () -> bookingService.cancelBooking(1));
    }

    @Test
    void cancelBooking_nullId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> bookingService.cancelBooking(null));
    }
                */
}