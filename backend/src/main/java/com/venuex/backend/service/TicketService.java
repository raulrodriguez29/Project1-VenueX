package com.venuex.backend.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.venuex.backend.entities.Booking;
import com.venuex.backend.entities.EventSeatSection;
import com.venuex.backend.entities.Payment;
import com.venuex.backend.entities.Ticket;
import com.venuex.backend.repository.BookingRepository;
import com.venuex.backend.repository.EventSeatSectionRepository;
import com.venuex.backend.repository.PaymentRepository;
import com.venuex.backend.repository.TicketRepository;

@Service
public class TicketService implements TicketServiceInterface {

    private final TicketRepository ticketRepository;
    private final BookingRepository bookingRepository;
    private final EventSeatSectionRepository seatSectionRepository;
    private final PaymentRepository paymentRepository;

    public TicketService(TicketRepository ticketRepository,
                         BookingRepository bookingRepository,
                         EventSeatSectionRepository seatSectionRepository,
                         PaymentRepository paymentRepository) {
        this.ticketRepository = ticketRepository;
        this.bookingRepository = bookingRepository;
        this.seatSectionRepository = seatSectionRepository;
        this.paymentRepository = paymentRepository;
    }

    // User actions
    @Override
    public List<Ticket> getTicketsForBooking(Integer bookingId) {
        validateId(bookingId);
        return ticketRepository.findByBookingId(bookingId);
    }

    @Override
    public Ticket addTicketToBooking(Integer bookingId, Integer seatSectionId) {
        validateId(bookingId);
        validateId(seatSectionId);

        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        Payment payment = paymentRepository.findByBookingId(bookingId)
            .orElseThrow(() -> new IllegalStateException("Payment not found"));

        if (payment.getStatus() == Payment.PaymentStatus.PAID) {
            throw new IllegalStateException("Cannot modify paid booking");
        }

        EventSeatSection section = seatSectionRepository.findById(seatSectionId)
            .orElseThrow(() -> new IllegalArgumentException("Seat section not found"));

        Ticket ticket = new Ticket(section, section.getPrice());
        booking.addTicket(ticket);

        return ticketRepository.save(ticket);
    }

    // Admin actions
    @Override
    public void updateTicketPrice(Integer ticketId, BigDecimal newPrice) {
        validateId(ticketId);

        if (newPrice == null || newPrice.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Invalid price");
        }

        Ticket ticket = ticketRepository.findById(ticketId)
            .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));

        ticket.setPrice(newPrice); // admin override
        ticketRepository.save(ticket);
    }

    @Override
    public void refundTicket(Integer ticketId) {
        validateId(ticketId);

        Ticket ticket = ticketRepository.findById(ticketId)
            .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));

        Booking booking = ticket.getBooking();
        booking.removeTicket(ticket);

        ticketRepository.delete(ticket);
    }

    private void validateId(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid ID");
        }
    }
}