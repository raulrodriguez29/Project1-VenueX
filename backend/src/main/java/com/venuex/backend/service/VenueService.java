package com.venuex.backend.service;

import com.venuex.backend.entities.Venue;
import com.venuex.backend.repository.VenueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class VenueService {
    private final VenueRepository venueRepository;

    public VenueService (VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Venue findById(Integer id) {
        return venueRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Venue not found"));
    }

    //create, upodate, delete only by Admins 
}
