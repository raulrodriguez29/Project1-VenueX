package com.venuex.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.venuex.backend.entities.SeatSection;
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

    //ADMINS only 
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Venue addVenue(@RequestBody Venue venue) {
        return venueService.createVenue(venue);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Venue updateVenue(@PathVariable Integer id, @RequestBody Venue venue) {
        return venueService.updateVenue(id, venue);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteVenue(@PathVariable Integer id) {
        venueService.deleteVenue(id);
    }

    //Seat Section Operations 
     @GetMapping("/{venueId}/seat-sections")
    public List<SeatSection> getVenueSeatSections(@PathVariable Integer venueId) {
        return venueService.getVenueSeatSections(venueId);
    }

    @PostMapping("/{venueId}/seat-sections")
    @ResponseStatus(HttpStatus.CREATED)
    public List<SeatSection> createSeatSections(@PathVariable Integer venueId, @RequestBody List<SeatSection> sections) {
        return venueService.createSeatSections(venueId, sections);
    }

    @PutMapping("/{venueId}/seat-sections")
    @ResponseStatus(HttpStatus.OK)
    public List<SeatSection> updateSeatSections(@PathVariable Integer venueId, @RequestBody List<SeatSection> sections) {
        return venueService.updateSeatSections(venueId, sections);
    }

    @DeleteMapping("/seat-sections/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSeatSections(@PathVariable("id") Integer id) {
        venueService.deleteSeatSections(id);
    }   
}
