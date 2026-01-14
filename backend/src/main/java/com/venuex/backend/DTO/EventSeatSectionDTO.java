package com.venuex.backend.DTO;

import java.math.BigDecimal;

public class EventSeatSectionDTO {
    private Integer seatSectionId;
    private String seatSectionName;
    private BigDecimal price;

    public EventSeatSectionDTO() {}

    public EventSeatSectionDTO(Integer seatSectionId, String seatSectionName, BigDecimal price) {
        this.seatSectionId = seatSectionId;
        this.seatSectionName = seatSectionName;
        this.price = price;
    }

    public String getSeatSectionName() { return seatSectionName; }
    public void setSeatSectionName(String seatSectionName) { this.seatSectionName = seatSectionName; }
    
    public Integer getSeatSectionId() { return seatSectionId; }
    public void setSeatSectionId(Integer seatSectionId) { this.seatSectionId = seatSectionId; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
