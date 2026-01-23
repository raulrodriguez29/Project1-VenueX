package com.venuex.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.BookingDTO;
import com.venuex.backend.entities.Booking;
import com.venuex.backend.entities.Event;
import com.venuex.backend.entities.Ticket;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.BookingRepository;
import com.venuex.backend.repository.EventRepository;
import com.venuex.backend.repository.UserRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            EventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public Integer createBooking(Integer eventId, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setStatus(Booking.BookingStatus.CANCELED);
        booking.setBookedAt(LocalDateTime.now());
        bookingRepository.save(booking);
        return booking.getId();
    }

    public List<BookingDTO> getUserBooking(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<Booking> bookings = bookingRepository.findByUserIdAndStatus(user.getId(), Booking.BookingStatus.BOOKED);
        return bookings.stream()
            .map(booking -> {
                BigDecimal total = booking.getTickets().stream()
                    .map(Ticket::getPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

                return new BookingDTO(
                    booking.getId(),
                    booking.getUser().getEmail(),
                    booking.getEvent().getName(),
                    booking.getBookedAt(),
                    total);
            })
            .collect(Collectors.toList());
    }
}
