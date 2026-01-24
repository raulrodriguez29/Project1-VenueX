package com.venuex.backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "notifications")
public class Notification {

    public enum EmailType {
        EMAIL
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional=false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private EmailType type;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "sent_at", updatable = false, insertable = false)
    private LocalDateTime sentAt;

    // Constructors
    public Notification() {}

    public Notification(User user, EmailType type, String message) {
        this.user = user;
        this.type = type;
        this.message = message;
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

    public EmailType getType() {
        return type; 
    }
    public void setType(EmailType type) {
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
