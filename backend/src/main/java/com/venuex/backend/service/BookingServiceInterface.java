package com.venuex.backend.service;

import java.util.List;
import com.venuex.backend.entities.Booking;

public interface BookingServiceInterface {
    Booking createBooking(Integer userId, Integer eventId);
    Booking getBookingById(Integer bookingId);
    List<Booking> getBookingsByUser(Integer userId);
    void cancelBooking(Integer bookingId);
}