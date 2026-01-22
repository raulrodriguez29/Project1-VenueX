package com.venuex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.venuex.backend.DTO.BookingDTO;
import com.venuex.backend.DTO.TicketDTO;
import com.venuex.backend.DTO.TicketReturnDTO;
import com.venuex.backend.entities.Booking;
import com.venuex.backend.entities.Payment;
import com.venuex.backend.service.BookingService;
import com.venuex.backend.service.TicketService;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;
    private final TicketService ticketService;

    public BookingController(BookingService bookingService, TicketService ticketService) {
        this.bookingService = bookingService;
        this.ticketService = ticketService;
    }

    // Create a new booking
    @PostMapping("/user/bookings")
    public ResponseEntity<Booking> createBooking(
            @RequestParam Integer eventId,
            HttpServletRequest request) {
        String userEmail = (String) request.getAttribute("userEmail");
        Booking booking = bookingService.createBooking(eventId,userEmail);
        return ResponseEntity.ok(booking);
    }

    // Get all bookings for a user
    @GetMapping("/user/bookings")
    public ResponseEntity<List<Booking>> getUserBookings(HttpServletRequest request) {
        String userEmail = (String) request.getAttribute("userEmail");
        return ResponseEntity.ok(bookingService.getUserBookings(userEmail));
    }

    // TicketController
    @PostMapping("/user/bookings/{bookingId}/tickets")
    public ResponseEntity<BookingDTO> addTicketsToBooking(
        @PathVariable Integer bookingId,
        @RequestBody List<TicketDTO> tickets,
        HttpServletRequest request) {

        String userEmail = (String) request.getAttribute("userEmail");
        BookingDTO bookingDTO = ticketService.addTicketsToBooking(bookingId, tickets, userEmail);
        return ResponseEntity.ok(bookingDTO);
    }

    @GetMapping("/user/bookings/{bookingId}/tickets")
        public ResponseEntity<List<TicketReturnDTO>> getTicketsForBooking(
            @PathVariable Integer bookingId,
            HttpServletRequest request) {

        String userEmail = (String) request.getAttribute("userEmail");

        return ResponseEntity.ok(ticketService.getTicketsForBooking(bookingId, userEmail));
    }

    //Payment controller
    @PostMapping("/user/bookings/{bookingId}/payment")
    public ResponseEntity<Payment> mockPay(
        @PathVariable Integer bookingId,
        HttpServletRequest request) {

        String userEmail = (String) request.getAttribute("userEmail");

        return ResponseEntity.ok(ticketService.mockPay(bookingId, userEmail));
    }
}