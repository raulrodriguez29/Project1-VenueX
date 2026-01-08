package com.venuex.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.venuex.backend.entities.venue;
import com.venuex.backend.service.venueService;
import java.util.List;

@RestController
@RequestMapping("/venues")
public class venueController {
    private final venueService venueservice;

    public venueController (venueService venueservice) {
        this.venueservice = venueservice;
    }
    
    @GetMapping
    public List<venue> getAllVenues() {
        return venueservice.getAllVenues();
    }

    @GetMapping("/{id}")
    public venue getVenueById(@PathVariable Integer id) {
        return venueservice.findById(id);
    }

}
