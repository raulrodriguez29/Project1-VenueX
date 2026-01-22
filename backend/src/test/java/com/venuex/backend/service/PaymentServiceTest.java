package com.venuex.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import com.venuex.backend.DTO.PaymentDTO;
import com.venuex.backend.entities.*;
import com.venuex.backend.entities.Payment.PaymentMethod;
import com.venuex.backend.entities.Payment.PaymentStatus;
import com.venuex.backend.repository.BookingRepository;
import com.venuex.backend.repository.PaymentRepository;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {
/*
    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private PaymentService paymentService;

    private Payment payment;
    private Booking booking;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);

        booking = new Booking();
        booking.setId(10);
        booking.setUser(user);

        payment = new Payment(booking, user, new BigDecimal("100.00"));
    }

    // Cart view
    @Test
    void getPaymentForBooking_success() {
        when(paymentRepository.findByBookingId(10))
                .thenReturn(Optional.of(payment));

        PaymentDTO dto = paymentService.getPaymentForBooking(10);

        assertNotNull(dto);
        assertEquals(new BigDecimal("100.00"), dto.getAmount());
        assertEquals("UNPAID", dto.getStatus());
    }

    @Test
    void getPaymentForBooking_notFound_throwsException() {
        when(paymentRepository.findByBookingId(10))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> paymentService.getPaymentForBooking(10));
    }

    @Test
    void getPaymentForBooking_nullBookingId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> paymentService.getPaymentForBooking(null));
    }

    @Test
    void getPaymentForBooking_zeroBookingId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> paymentService.getPaymentForBooking(0));
    }

    @Test
    void getPaymentForBooking_negativeBookingId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> paymentService.getPaymentForBooking(-1));
    }

    // Checkout - mock payment
    @Test
    void checkout_success() {
        when(paymentRepository.findByBookingId(10))
                .thenReturn(Optional.of(payment));

        PaymentDTO dto = paymentService.checkout(10);

        assertEquals("PAID", dto.getStatus());
        verify(paymentRepository).save(payment);
    }

    @Test
    void checkout_alreadyPaid_throwsException() {
        payment.setStatus(PaymentStatus.PAID);

        when(paymentRepository.findByBookingId(10))
                .thenReturn(Optional.of(payment));

        assertThrows(IllegalStateException.class,
                () -> paymentService.checkout(10));
    }

    @Test
    void checkout_paymentNotFound_throwsException() {
        when(paymentRepository.findByBookingId(10))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> paymentService.checkout(10));
    }

    @Test
    void checkout_nullBookingId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> paymentService.checkout(null));
    }

    @Test
    void checkout_zeroBookingId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> paymentService.checkout(0));
    }

    @Test
    void checkout_negativeBookingId_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> paymentService.checkout(-5));
    }

    // Edge cases
    @Test
    void checkout_amountZero_throwsException() {
        payment = new Payment(booking, user, BigDecimal.ZERO);

        when(paymentRepository.findByBookingId(10))
                .thenReturn(Optional.of(payment));

        assertThrows(IllegalStateException.class,
                () -> paymentService.checkout(10));
    }

    @Test
    void checkout_amountNegative_throwsException() {
        payment = new Payment(booking, user, new BigDecimal("100.00"));
        when(paymentRepository.findByBookingId(10))
                .thenReturn(Optional.of(payment));

        assertThrows(IllegalStateException.class,
                () -> paymentService.checkout(10));
    }

    @Test
    void checkout_missingBookingReference_throwsException() {
        payment = new Payment(null, user, new BigDecimal("100.00"));


        when(paymentRepository.findByBookingId(10))
                .thenReturn(Optional.of(payment));

        assertThrows(IllegalStateException.class,
                () -> paymentService.checkout(10));
    }

    @Test
    void getPaymentForBooking_statusUnpaid() {
        when(paymentRepository.findByBookingId(10))
                .thenReturn(Optional.of(payment));

        PaymentDTO dto = paymentService.getPaymentForBooking(10);

        assertEquals("UNPAID", dto.getStatus());
    }
        */
}
