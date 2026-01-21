package com.venuex.backend.DTO;

import java.math.BigDecimal;

public class PaymentDTO {

    private Integer paymentId;
    private Integer bookingId;
    private BigDecimal amount;
    private String status;

    public PaymentDTO() {}

    public PaymentDTO(Integer paymentId, Integer bookingId, BigDecimal amount, String status) {
        this.paymentId = paymentId;
        this.bookingId = bookingId;
        this.amount = amount;
        this.status = status;
    }

    public Integer getPaymentId() { return paymentId; }
    public Integer getBookingId() { return bookingId; }
    public BigDecimal getAmount() { return amount; }
    public String getStatus() { return status; }

    public void setPaymentId() { this.paymentId = paymentId; }
    public void setBookingId() { this.bookingId = bookingId; }
    public void setAmount() { this.amount = amount; }
    public void setStatus() { this.status = status; }
}
