package com.venuex.backend.DTO;

public class TicketDTO {

    private String seatSectionName;
    private Integer quantity;

    public String getSeatSectionName() {
        return seatSectionName;
    }

    public void setSeatSectionName(String seatSectionName) {
        this.seatSectionName = seatSectionName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
