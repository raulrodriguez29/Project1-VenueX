package com.venuex.backend.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.cglib.core.Local;

public class BookingDTO {

    private Integer id;
    private Integer userId;
    private Integer eventId;
    private String status;
    private LocalDateTime bookedAt;
    private BigDecimal totalAmount;

    public BookingDTO() {}

    public BookingDTO(Integer id, Integer userId, Integer eventId, String status, LocalDateTime bookedAt, BigDecimal totalAmount) {
        this.id = id;
        this.userId = userId;
        this.eventId = eventId;
        this.status = status;
        this.bookedAt = bookedAt;
        this.totalAmount = totalAmount;
    }

    public Integer getId() { return id; }
    public Integer getUserId() { return userId; }
    public Integer getEventId() { return eventId; }
    public String getStatus() { return status; }
    public LocalDateTime getBookedAt()  {return bookedAt; }
    public BigDecimal getTotalAmount()  {return totalAmount; }

    public void setId() { this.id = id; }
    public void setUserId() { this.userId = userId; }
    public void setEventId() { this.eventId = eventId; }
    public void setStatus() { this.status = status; }
    public void setBookedAt() { this.bookedAt = bookedAt; }
    public void setTotalAmount() { this.totalAmount = totalAmount; }
}

