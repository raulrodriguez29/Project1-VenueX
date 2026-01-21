package com.venuex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.venuex.backend.DTO.TicketDTO;
import com.venuex.backend.entities.Booking;
import com.venuex.backend.entities.EventSeatSection;
import com.venuex.backend.entities.Ticket;
import com.venuex.backend.service.BookingServiceInterface;
import com.venuex.backend.service.TicketService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingServiceInterface bookingService;
    private final TicketService ticketService;

    public BookingController(BookingServiceInterface bookingService, TicketService ticketService) {
        this.bookingService = bookingService;
        this.ticketService = ticketService;
    }

    // Create a new booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestParam Integer userId,
            @RequestParam Integer eventId) {

        Booking booking = bookingService.createBooking(userId, eventId);
        return ResponseEntity.ok(booking);
    }

    // Get a booking by ID
    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBookingById(
            @PathVariable Integer bookingId) {

        return ResponseEntity.ok(
                bookingService.getBookingById(bookingId)
        );
    }

    // Get all bookings for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                bookingService.getBookingsByUser(userId)
        );
    }
    
    // Cancel a booking
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> cancelBooking(
            @PathVariable Integer bookingId) {

        bookingService.cancelBooking(bookingId);
        return ResponseEntity.noContent().build();
    }

    // TicketController
    @PostMapping("/{bookingId}/tickets")
    public Integer postTicket(@PathVariable Integer bookId, @RequestBody List<TicketDTO> purchases) {
        ticketService.addTicketToBooking(bookId, purchases);
        return bookId;
    }
    
}