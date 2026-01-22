package com.venuex.backend.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BookingDTO {

    private Integer id;
    private String userName;
    private String eventName;
    private LocalDateTime bookedAt;
    private BigDecimal totalAmount;

    public BookingDTO() {}

    public BookingDTO(Integer id, String userName, String eventName, LocalDateTime bookedAt, BigDecimal totalAmount) {
        this.id = id;
        this.userName = userName;
        this.eventName = eventName;
        this.bookedAt = bookedAt;
        this.totalAmount = totalAmount;
    }

    public Integer getId() { return id; }
    public String getUserId() { return userName; }
    public String getEventId() { return eventName; }
    public LocalDateTime getBookedAt()  {return bookedAt; }
    public BigDecimal getTotalAmount()  {return totalAmount; }

    public void setId(Integer id) { this.id = id; }
    public void setUserId(String userName) { this.userName = userName; }
    public void setEventId(String eventName) { this.eventName = eventName; }
    public void setBookedAt(LocalDateTime bookedAt) { this.bookedAt = bookedAt; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
}

