package com.venuex.backend.service;

import com.venuex.backend.DTO.PaymentDTO;

public interface PaymentServiceInterface {

    PaymentDTO getPaymentForBooking(Integer bookingId);
    PaymentDTO checkout(Integer bookingId);
}

