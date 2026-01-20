package com.venuex.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.venuex.backend.entities.Booking;
import com.venuex.backend.entities.Booking.BookingStatus;
import com.venuex.backend.entities.Event;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.BookingRepository;
import com.venuex.backend.repository.EventRepository;
import com.venuex.backend.repository.UserRepository;

@Service
@Transactional
public class BookingService implements BookingServiceInterface {

    private final BookingRepository bookingRepo;
    private final UserRepository userRepo;
    private final EventRepository eventRepo;

    public BookingService(
            BookingRepository bookingRepo,
            UserRepository userRepo,
            EventRepository eventRepo) {
        this.bookingRepo = bookingRepo;
        this.userRepo = userRepo;
        this.eventRepo = eventRepo;
    }

    @Override
    public Booking createBooking(Integer userId, Integer eventId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setStatus(BookingStatus.BOOKED);
        booking.setBookedAt(LocalDateTime.now());

        return bookingRepo.save(booking);
    }

    @Override
    public Booking getBookingById(Integer bookingId) {
        return bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    public List<Booking> getBookingsByUser(Integer userId) {
        return bookingRepo.findByUserId(userId);
    }

    @Override
    public void cancelBooking(Integer bookingId) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELED);
    }
}
