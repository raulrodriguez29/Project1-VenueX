package com.venuex.backend.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.venuex.backend.DTO.PaymentDTO;
import com.venuex.backend.entities.*;
import com.venuex.backend.entities.Payment.PaymentStatus;
import com.venuex.backend.repository.*;

@Service
public class PaymentService implements PaymentServiceInterface {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public PaymentService(PaymentRepository paymentRepository,
                          BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public PaymentDTO getPaymentForBooking(Integer bookingId) {
        Payment payment = paymentRepository.findByBookingId(bookingId)
            .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        return mapToDTO(payment);
    }

    @Override
    public PaymentDTO checkout(Integer bookingId) {
        Payment payment = paymentRepository.findByBookingId(bookingId)
            .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        if (payment.getStatus() == PaymentStatus.PAID) {
            throw new IllegalStateException("Booking already paid");
        }

        // Mock credit card success
        payment.setStatus(PaymentStatus.PAID);
        paymentRepository.save(payment);

        return mapToDTO(payment);
    }

    private PaymentDTO mapToDTO(Payment payment) {
        return new PaymentDTO(
            payment.getId(),
            payment.getBooking().getId(),
            payment.getAmount(),
            payment.getStatus().name()
        );
    }
}

