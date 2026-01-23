package com.venuex.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.venuex.backend.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUserId(Integer userId);
    List<Booking> findByUserIdAndStatus(Integer userId, Booking.BookingStatus status);
}


