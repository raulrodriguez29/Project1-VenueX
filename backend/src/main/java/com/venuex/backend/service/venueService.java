package com.venuex.backend.service;

import com.venuex.backend.entities.venue;
import com.venuex.backend.repository.venueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class venueService {
    private final venueRepository venuerepository;

    public venueService (venueRepository venuerepository) {
        this.venuerepository = venuerepository;
    }

    public List<venue> getAllVenues() {
        return venuerepository.findAll();
    }

    public venue findById(Integer id) {
        return venuerepository.findById(id).orElse(null);
    }
}
