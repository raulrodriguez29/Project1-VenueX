package com.venuex.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.venuex.backend.entities.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByBookingId(Integer bookingId);
}