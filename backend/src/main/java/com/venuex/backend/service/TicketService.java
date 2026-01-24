package com.venuex.backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.BookingDTO;
import com.venuex.backend.DTO.TicketDTO;
import com.venuex.backend.DTO.TicketReturnDTO;
import com.venuex.backend.entities.Booking;
import com.venuex.backend.entities.Event;
import com.venuex.backend.entities.EventSeatSection;
import com.venuex.backend.entities.Payment;
import com.venuex.backend.entities.Ticket;
import com.venuex.backend.repository.BookingRepository;
import com.venuex.backend.repository.EventRepository;
import com.venuex.backend.repository.EventSeatSectionRepository;
import com.venuex.backend.repository.PaymentRepository;
import com.venuex.backend.repository.TicketRepository;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final BookingRepository bookingRepository;
    private final EventSeatSectionRepository eventSeatSectionRepository;
    private final PaymentRepository paymentRepository;
    private final NotificationService notificationService;
    private final EventRepository eventRepository;

    public TicketService(TicketRepository ticketRepository,
                        BookingRepository bookingRepository,
                        EventSeatSectionRepository eventSeatSectionRepository,
                        PaymentRepository paymentRepository,
                        NotificationService notificationService,
                        EventRepository eventRepository) {
        this.ticketRepository = ticketRepository;
        this.bookingRepository = bookingRepository;
        this.eventSeatSectionRepository = eventSeatSectionRepository;
        this.paymentRepository = paymentRepository;
        this.notificationService = notificationService;
        this.eventRepository = eventRepository;
    }

    // User actions
    public List<TicketReturnDTO> getTicketsForBooking(Integer bookingId, String userEmail) {
        validateId(bookingId);
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user");
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
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user");
        }
        BigDecimal total = BigDecimal.ZERO;
        for (TicketDTO req : tickets) {
            EventSeatSection section = eventSeatSectionRepository
                .findByEvent_IdAndSeatSection_Type(booking.getEvent().getId(),req.getSeatSectionName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event seat section not found"));

            if (req.getQuantity() > section.getRemainingCapacity()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Not enough seats available in section: " + req.getSeatSectionName());
            }
            for (int i = 0; i < req.getQuantity(); i++) {
                Ticket ticket = new Ticket();
                ticket.setBooking(booking);
                ticket.setEventSeatSection(section);
                ticket.setPrice(section.getPrice());

                booking.getTickets().add(ticket);
                total = total.add(section.getPrice());
            }
            //decrement capicity
            section.setRemainingCapacity(section.getRemainingCapacity() - req.getQuantity());
            eventSeatSectionRepository.save(section);
        }
        //close event if its sold out 
        Event event = booking.getEvent();
        boolean soldOut = event.getSeatSections().stream()
            .allMatch(s -> s.getRemainingCapacity() == 0);
        if (soldOut) {
            event.setStatus("CLOSED");
            eventRepository.save(event);
        }   
        bookingRepository.save(booking);
        return new BookingDTO(
            booking.getId(),
            booking.getUser().getEmail(),
            booking.getEvent().getName(),
            booking.getBookedAt(),
            total);
    }

    public String mockPay(Integer bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (!booking.getUser().getEmail().equals(userEmail)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized user");
        }

        // Prevent double payment
        if (paymentRepository.findByBookingId(bookingId).isPresent()) {
            throw new ResponseStatusException(HttpStatus.ALREADY_REPORTED, "Booking already paid");
        }

        if (booking.getTickets().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tickets not found");
        }
        //get total price
        BigDecimal totalAmount = booking.getTickets().stream()
            .map(Ticket::getPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        Payment payment = new Payment(booking, booking.getUser(), totalAmount);
        payment.setStatus(Payment.PaymentStatus.PAID);
        booking.setStatus(Booking.BookingStatus.BOOKED);
        paymentRepository.save(payment);
        // CREATE NOTIFICATION HERE
        notificationService.createNotification(
            booking.getUser(),
            "Your payment was successful! Your booking is confirmed.");
        return "PAID";
    }

    private void validateId(Integer id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid ID");
        }
    }
}