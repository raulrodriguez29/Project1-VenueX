package com.venuex.backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    //add @ManytoOne
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    //@Column(name = "sent_at", columnDefinition = "TIMESTAMP")
    //private LocalDateTime sentAt = LocalDateTime.now();

    // Constructors
    public notification() {

    }

    public notification(Integer userId, String type, String message) {
        this.userId = userId;
        this.type = type;
        this.message = message;
        //this.sentAt = LocalDateTime.now();
    }

    public Integer getId() {
        return id; 
    }

    public void setId(Integer id) {
        this.id = id; }

    public Integer getUserId() {
        return userId; 
    }

    public void setUserId(Integer userId) {
        this.userId = userId; 
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

    //public LocalDateTime getSentAt() {
        //return sentAt; 
    //}

    //public void setSentAt(LocalDateTime sentAt) {
        //this.sentAt = sentAt; 
    //}
    
}
