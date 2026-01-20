package com.venuex.backend.entities;

import java.math.BigDecimal;
import jakarta.persistence.*;

@Entity
@Table(name = "payment")
public class Payment {

    public enum PaymentStatus {
        PAID,
        UNPAID
    }

    public enum PaymentMethod {
        CREDIT_CARD
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    // Constructors
    public Payment() {}

    public Payment(Booking booking, User user, BigDecimal amount) {
        this.booking = booking;
        this.user = user;
        this.amount = amount;
        this.status = PaymentStatus.UNPAID;
        this.paymentMethod = PaymentMethod.CREDIT_CARD;
    }

    // Getters & setters
    public Integer getId() { return id; }

    public Booking getBooking() { return booking; }

    public User getUser() { return user; }

    public BigDecimal getAmount() { return amount; }

    public PaymentMethod getPaymentMethod() { return paymentMethod; }

    public PaymentStatus getStatus() { return status; }

    public void setStatus(PaymentStatus status) { this.status = status; }
}
