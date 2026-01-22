package com.venuex.backend.entities;

import java.math.BigDecimal;
import jakarta.persistence.*;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_seat_section_id", nullable = false)
    private EventSeatSection eventSeatSection;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // Constructors
    public Ticket() {}

    public Ticket(EventSeatSection eventSeatSection, BigDecimal price) {
        this.eventSeatSection = eventSeatSection;
        this.price = price;
    }

    // Getters & setters (booking setter REQUIRED)
    public Integer getId() { return id; }

    public Booking getBooking() { return booking; }

    public void setBooking(Booking booking) { this.booking = booking; }

    public EventSeatSection getEventSeatSection() { return eventSeatSection; }

    public void setEventSeatSection(EventSeatSection eventSeatSection) {this.eventSeatSection = eventSeatSection;}

    public BigDecimal getPrice() { return price; }

    public void setPrice(BigDecimal price) { this.price = price; }
}