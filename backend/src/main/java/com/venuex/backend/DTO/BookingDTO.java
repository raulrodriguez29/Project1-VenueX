package com.venuex.backend.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BookingDTO {

    private Integer id;
    private Integer userId;
    private Integer eventId;
    private String status;
    private LocalDateTime bookedAt;
    private BigDecimal totalAmount;

    // Add getters & setters
}

