package com.venuex.backend.DTO;

import java.math.BigDecimal;

public class EventSeatSectionDTO {
    private String seatSectionName;
    private BigDecimal price;

    public EventSeatSectionDTO() {}

    public EventSeatSectionDTO(String seatSectionName, BigDecimal price) {
        this.seatSectionName = seatSectionName;
        this.price = price;
    }

    public String getSeatSectionName() { return seatSectionName; }
    public void setSeatSectionName(String seatSectionName) { this.seatSectionName = seatSectionName; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
