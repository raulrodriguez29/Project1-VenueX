package com.venuex.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.venuex.backend.entities.Venue;
import com.venuex.backend.service.VenueService;
import java.util.List;

@RestController
@RequestMapping("/venues")
public class VenueController {
    private final VenueService venueService;

    public VenueController (VenueService venueService) {
        this.venueService = venueService;
    }
    
    @GetMapping
    public List<Venue> getAllVenues() {
        return venueService.getAllVenues();
    }

    @GetMapping("/{id}")
    public Venue getVenueById(@PathVariable Integer id) {
        return venueService.findById(id);
    }

}
