package com.venuex.backend.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Many events can belong to one venue
    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    // Many events can be created by one user
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private String status;

    // One event can have multiple seat sections
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventSeatSection> seatSections;

    public Integer getId() {
        return id;
    }

    public Venue getVenue() {
        return venue;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public List<EventSeatSection> getSeatSections() {
        return seatSections;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setSeatSections(List<EventSeatSection> seatSections) {
        this.seatSections = seatSections;
    }

    public void setStatus (String status) {
        this.status = status;
    }
}

