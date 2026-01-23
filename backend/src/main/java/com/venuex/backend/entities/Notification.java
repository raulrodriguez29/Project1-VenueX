package com.venuex.backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional=false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "sent_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime sentAt = LocalDateTime.now();

    // Constructors
    public Notification() {

    }

    public Notification(Integer id, User user, String type, String message) {
        this.id = id;
        this.user = user;
        this.type = type;
        this.message = message;
        this.sentAt = LocalDateTime.now();
    }

    public Integer getId() {
        return id; 
    }

    public void setId(Integer id) {
        this.id = id; }

    public User getUser() {
        return user; 
    }

    public void setUser(User user) {
        this.user = user; 
    }

    public String getType() {
        return type; 
    }
    public void setType(String type) {
        this.type = type; 
    }

    public String getMessage() {
        return message; 
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getSentAt() {
        return sentAt; 
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt; 
    }
    
}
