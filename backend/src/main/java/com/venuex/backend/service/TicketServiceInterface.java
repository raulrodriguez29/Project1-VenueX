package com.venuex.backend.service;

import java.math.BigDecimal;
import java.util.List;

import com.venuex.backend.entities.EventSeatSection;
import com.venuex.backend.entities.Ticket;

public interface TicketServiceInterface {

    // User actions
    List<Ticket> getTicketsForBooking(Integer bookingId);
    Ticket addTicketToBooking(Integer bookingId, List<EventSeatSection> seatSections);

    // Admin actions
    void updateTicketPrice(Integer ticketId, BigDecimal newPrice);
    void refundTicket(Integer ticketId);
}

