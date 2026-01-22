package com.venuex.backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.venuex.backend.DTO.BookingDTO;
import com.venuex.backend.DTO.TicketDTO;
import com.venuex.backend.DTO.TicketReturnDTO;
import com.venuex.backend.entities.Booking;
import com.venuex.backend.entities.EventSeatSection;
import com.venuex.backend.entities.Payment;
import com.venuex.backend.entities.Ticket;
import com.venuex.backend.repository.BookingRepository;
import com.venuex.backend.repository.EventSeatSectionRepository;
import com.venuex.backend.repository.PaymentRepository;
import com.venuex.backend.repository.TicketRepository;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final BookingRepository bookingRepository;
    private final EventSeatSectionRepository eventSeatSectionRepository;
    private final PaymentRepository paymentRepository;

    public TicketService(TicketRepository ticketRepository,
                        BookingRepository bookingRepository,
                        EventSeatSectionRepository eventSeatSectionRepository,
                        PaymentRepository paymentRepository) {
        this.ticketRepository = ticketRepository;
        this.bookingRepository = bookingRepository;
        this.eventSeatSectionRepository = eventSeatSectionRepository;
        this.paymentRepository = paymentRepository;
    }

    // User actions
    public List<TicketReturnDTO> getTicketsForBooking(Integer bookingId, String userEmail) {
        validateId(bookingId);
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access denied");
        }
        return ticketRepository.findByBookingId(bookingId)
            .stream()
            .map(ticket -> new TicketReturnDTO(
                    ticket.getId(),
                    ticket.getEventSeatSection().getSeatSection().getType(),
                    ticket.getPrice()
            ))
            .collect(Collectors.toList());
    }

    public BookingDTO addTicketsToBooking(Integer bookingId, List<TicketDTO> tickets, String userEmail) {
        validateId(bookingId);

        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access denied");
        }
        BigDecimal total = BigDecimal.ZERO;
        for (TicketDTO req : tickets) {
            EventSeatSection section = eventSeatSectionRepository
                .findByEvent_IdAndSeatSection_Type(booking.getEvent().getId(),req.getSeatSectionName())
                .orElseThrow(() -> new RuntimeException("Seat section not found"));

            for (int i = 0; i < req.getQuantity(); i++) {
                Ticket ticket = new Ticket();
                ticket.setBooking(booking);
                ticket.setEventSeatSection(section);
                ticket.setPrice(section.getPrice());

                booking.getTickets().add(ticket);
                total = total.add(section.getPrice());
            }
        }
        bookingRepository.save(booking);
        return new BookingDTO(
            booking.getId(),
            booking.getUser().getEmail(),
            booking.getEvent().getName(),
            booking.getBookedAt(),
            total);
    }

    public Payment mockPay(Integer bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access denied");
        }

        // Prevent double payment
        if (paymentRepository.findByBookingId(bookingId).isPresent()) {
            throw new RuntimeException("Booking already paid");
        }
        //get total price
        BigDecimal totalAmount = booking.getTickets().stream()
            .map(Ticket::getPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        Payment payment = new Payment(booking, booking.getUser(), totalAmount);
        payment.setStatus(Payment.PaymentStatus.PAID);
        booking.setStatus(Booking.BookingStatus.BOOKED);
        return paymentRepository.save(payment);
    }

    private void validateId(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid ID");
        }
    }
}