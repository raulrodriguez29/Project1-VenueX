package com.venuex.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import com.venuex.backend.entities.*;
import com.venuex.backend.entities.Payment.PaymentStatus;
import com.venuex.backend.repository.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private EventSeatSectionRepository seatSectionRepository;

    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private TicketService ticketService;

    private Booking booking;
    private Ticket ticket;
    private EventSeatSection section;
    private Payment payment;

    @BeforeEach
    void setUp() {
        booking = new Booking();
        booking.setId(1);

        section = new EventSeatSection();
        section.setId(100);
        section.setPrice(new BigDecimal("50.00"));

        ticket = new Ticket(section, section.getPrice());
        ticket.setBooking(booking);

        payment = new Payment(booking, new User(), new BigDecimal("50.00"));
    }

    // Get tickets
    @Test
    void getTicketsForBooking_success() {
        when(ticketRepository.findByBookingId(1))
                .thenReturn(List.of(ticket));

        List<Ticket> result = ticketService.getTicketsForBooking(1);

        assertEquals(1, result.size());
    }

    @Test
    void getTicketsForBooking_emptyList() {
        when(ticketRepository.findByBookingId(1))
                .thenReturn(Collections.emptyList());

        List<Ticket> result = ticketService.getTicketsForBooking(1);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void getTicketsForBooking_nullId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> ticketService.getTicketsForBooking(null));
    }

    @Test
    void getTicketsForBooking_negativeId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> ticketService.getTicketsForBooking(-1));
    }

    // Add ticket to booking   
    @Test
    void addTicketToBooking_success() {
        when(bookingRepository.findById(1))
                .thenReturn(Optional.of(booking));
        when(seatSectionRepository.findById(100))
                .thenReturn(Optional.of(section));
        when(paymentRepository.findByBookingId(1))
                .thenReturn(Optional.of(payment));
        when(ticketRepository.save(any(Ticket.class)))
                .thenReturn(ticket);

        Ticket result = ticketService.addTicketToBooking(1, 100);

        assertNotNull(result);
        verify(ticketRepository).save(any(Ticket.class));
    }

    @Test
    void addTicketToBooking_paymentAlreadyPaid_throwsException() {
        payment.setStatus(PaymentStatus.PAID);

        when(bookingRepository.findById(1))
                .thenReturn(Optional.of(booking));
        when(seatSectionRepository.findById(100))
                .thenReturn(Optional.of(section));
        when(paymentRepository.findByBookingId(1))
                .thenReturn(Optional.of(payment));

        assertThrows(IllegalStateException.class,
                () -> ticketService.addTicketToBooking(1, 100));
    }

    @Test
    void addTicketToBooking_bookingNotFound() {
        when(bookingRepository.findById(1))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> ticketService.addTicketToBooking(1, 100));
    }

    @Test
    void addTicketToBooking_seatSectionNotFound() {
        when(bookingRepository.findById(1))
                .thenReturn(Optional.of(booking));
        when(seatSectionRepository.findById(100))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> ticketService.addTicketToBooking(1, 100));
    }

    @Test
    void addTicketToBooking_paymentMissing() {
        when(bookingRepository.findById(1))
                .thenReturn(Optional.of(booking));
        when(seatSectionRepository.findById(100))
                .thenReturn(Optional.of(section));
        when(paymentRepository.findByBookingId(1))
                .thenReturn(Optional.empty());

        assertThrows(IllegalStateException.class,
                () -> ticketService.addTicketToBooking(1, 100));
    }

    @Test
    void addTicketToBooking_invalidBookingId() {
        assertThrows(IllegalArgumentException.class,
                () -> ticketService.addTicketToBooking(0, 100));
    }

    @Test
    void addTicketToBooking_invalidSeatSectionId() {
        assertThrows(IllegalArgumentException.class,
                () -> ticketService.addTicketToBooking(1, -5));
    }

    // Admin - update price
    @Test
    void updateTicketPrice_success() {
        when(ticketRepository.findById(1))
                .thenReturn(Optional.of(ticket));

        ticketService.updateTicketPrice(1, new BigDecimal("75.00"));

        verify(ticketRepository).save(ticket);
    }

    @Test
    void updateTicketPrice_ticketNotFound() {
        when(ticketRepository.findById(1))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> ticketService.updateTicketPrice(1, BigDecimal.TEN));
    }

    @Test
    void updateTicketPrice_invalidPrice() {
        assertThrows(IllegalArgumentException.class,
                () -> ticketService.updateTicketPrice(1, BigDecimal.ZERO));
    }

    // Admin refund
    @Test
    void refundTicket_success() {
        when(ticketRepository.findById(1))
                .thenReturn(Optional.of(ticket));

        ticketService.refundTicket(1);

        verify(ticketRepository).delete(ticket);
    }

    @Test
    void refundTicket_ticketNotFound() {
        when(ticketRepository.findById(1))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> ticketService.refundTicket(1));
    }

    @Test
    void refundTicket_invalidId() {
        assertThrows(IllegalArgumentException.class,
                () -> ticketService.refundTicket(null));
    }
}