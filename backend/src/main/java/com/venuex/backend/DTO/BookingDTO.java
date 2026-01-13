package com.venuex.backend.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BookingDTO {

    private Integer id;
    private Long userId;
    private Long eventId;
    private String status;
    private LocalDateTime bookedAt;
    private BigDecimal totalAmount;

    // getters & setters
}

