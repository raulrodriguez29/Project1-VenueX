package com.venuex.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.BookingDTO;
import com.venuex.backend.DTO.TicketDTO;
import com.venuex.backend.DTO.TicketReturnDTO;
import com.venuex.backend.entities.*;
import com.venuex.backend.repository.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private EventSeatSectionRepository eventSeatSectionRepository;

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private EventRepository eventRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private TicketService ticketService;

    private Booking booking;
    private Ticket ticket1;
    private EventSeatSection eventSeatSection;
    private EventSeatSection vipSection;

    @BeforeEach
    void setUp() {
        // Mock user
        User user = new User();
        user.setId(10);
        user.setEmail("temp@gmail.com");

        Event event = new Event();
        event.setId(20);
        event.setName("Temp Event");

        // Mock booking
        booking = new Booking();
        booking.setId(1);
        booking.setUser(user);
        booking.setEvent(event);
        booking.setTickets(new ArrayList<>());

        // SeatSection and EventSeatSection
        SeatSection seatSection = new SeatSection();
        seatSection.setType("VIP");
        seatSection.setCapacity(10);

        eventSeatSection = new EventSeatSection();
        eventSeatSection.setSeatSection(seatSection);
        eventSeatSection.setRemainingCapacity(seatSection.getCapacity());

        // Ticket
        ticket1 = new Ticket();
        ticket1.setId(101);
        ticket1.setBooking(booking);
        ticket1.setEventSeatSection(eventSeatSection);
        ticket1.setPrice(BigDecimal.valueOf(100));

        vipSection = new EventSeatSection();
        vipSection.setId(100);
        vipSection.setEvent(event);
        vipSection.setSeatSection(seatSection);
        vipSection.setPrice(BigDecimal.valueOf(50));
        vipSection.setRemainingCapacity(10);

    }

    // Get tickets
    @Test
    void getTicketsForBooking_success() {
        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));
        when(ticketRepository.findByBookingId(1)).thenReturn(List.of(ticket1));

        List<TicketReturnDTO> tickets = ticketService.getTicketsForBooking(1, "temp@gmail.com");

        assertNotNull(tickets);
        assertEquals(1, tickets.size());

        TicketReturnDTO dto = tickets.get(0);
        assertEquals(101, dto.getId());
        assertEquals("VIP", dto.getSeatSections());
        assertEquals(BigDecimal.valueOf(100), dto.getPrice());

        verify(bookingRepository).findById(1);
        verify(ticketRepository).findByBookingId(1);
    }

    @Test
    void getTicketsForBooking_bookingNotFound() {
        when(bookingRepository.findById(999)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
                ticketService.getTicketsForBooking(999, "temp@gmail.com"));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Booking not found", exception.getReason());

        verify(ticketRepository, never()).findByBookingId(any());
    }

    @Test
    void getTicketsForBooking_unauthorizedUser() {
        User anotherUser = new User();
        anotherUser.setEmail("hacker@gmail.com");

        booking.setUser(anotherUser); 

        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
                ticketService.getTicketsForBooking(1, "temp@gmail.com"));

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatusCode());
        assertEquals("Unauthorized user", exception.getReason());

        verify(ticketRepository, never()).findByBookingId(any());
    }

    // Add ticket to booking   

    @Test
    void addTicketsToBooking_success() {
        TicketDTO ticketRequest = new TicketDTO();
        ticketRequest.setSeatSectionName("VIP");
        ticketRequest.setQuantity(2);

        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));
        when(eventSeatSectionRepository.findByEvent_IdAndSeatSection_Type(20, "VIP"))
            .thenReturn(Optional.of(vipSection));
        when(eventRepository.save(any(Event.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));
        when(bookingRepository.save(any(Booking.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BookingDTO result = ticketService.addTicketsToBooking(1, List.of(ticketRequest), "temp@gmail.com");

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("temp@gmail.com", result.getUserName());
        assertEquals("Temp Event", result.getEventName());
        assertEquals(BigDecimal.valueOf(100), result.getTotalAmount()); // 50 * 2

        assertEquals(2, booking.getTickets().size());
        assertEquals(vipSection, booking.getTickets().get(0).getEventSeatSection());

        verify(bookingRepository).findById(1);
        verify(eventSeatSectionRepository).findByEvent_IdAndSeatSection_Type(20, "VIP");
        verify(bookingRepository).save(booking);
    }

    @Test
    void addTicketsToBooking_bookingNotFound() {
        when(bookingRepository.findById(999)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
            ticketService.addTicketsToBooking(999, List.of(), "temp@gmail.com"));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Booking not found", exception.getReason());
        verify(eventSeatSectionRepository, never()).findByEvent_IdAndSeatSection_Type(anyInt(), anyString());
    }

    @Test
    void addTicketsToBooking_unauthorizedUser() {
        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
            ticketService.addTicketsToBooking(1, List.of(), "hacker@gmail.com")
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatusCode());
        assertEquals("Unauthorized user", exception.getReason());
        verify(eventSeatSectionRepository, never()).findByEvent_IdAndSeatSection_Type(anyInt(), anyString());
    }


    @Test
    void mockPay_success() {
        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));
        when(paymentRepository.findByBookingId(1)).thenReturn(Optional.empty());
        when(paymentRepository.save(any(Payment.class))).thenAnswer(invocation -> invocation.getArgument(0));
        booking.getTickets().add(ticket1);
        String result = ticketService.mockPay(1, "temp@gmail.com");

        assertEquals("PAID", result);
        assertEquals(Booking.BookingStatus.BOOKED, booking.getStatus());
        verify(paymentRepository).save(any(Payment.class));
        verify(bookingRepository, never()).save(any());
    }

    @Test
    void mockPay_alreadyPaid() {
        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));
        when(paymentRepository.findByBookingId(1)).thenReturn(Optional.of(new Payment()));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
            ticketService.mockPay(1, "temp@gmail.com"));

        assertEquals(HttpStatus.ALREADY_REPORTED, exception.getStatusCode());
        assertEquals("Booking already paid", exception.getReason());
    }

    @Test
    void mockPay_bookingNotFound() {
        when(bookingRepository.findById(999)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
            ticketService.mockPay(999, "temp@gmail.com"));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Booking not found", exception.getReason());
    }
}