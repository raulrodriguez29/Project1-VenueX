package com.venuex.backend.service;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.venuex.backend.entities.SeatSection;
import com.venuex.backend.entities.Venue;
import com.venuex.backend.repository.SeatSectionRepository;
import com.venuex.backend.repository.VenueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class VenueService {
    private final VenueRepository venueRepository;
    private final SeatSectionRepository seatSectionRepository;

    public VenueService (VenueRepository venueRepository, SeatSectionRepository seatSectionRepository) {
        this.venueRepository = venueRepository;
        this.seatSectionRepository = seatSectionRepository;
    }

    //Venue get methods 
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Venue findById(Integer id) {
        return venueRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venue not found"));
    }

    //create, update, delete only by ADMINS
    public Venue createVenue(Venue venue) {
        if (venueRepository.existsByName(venue.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Venue already exists");
        }
        return venueRepository.save(venue);
    }

    public Venue updateVenue(Integer id, Venue updatedVenue) {
        Venue existingVenue = venueRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venue not found"));

        if (!existingVenue.getName().equals(updatedVenue.getName())
                && venueRepository.existsByName(updatedVenue.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Venue already exists");
        }

        existingVenue.setName(updatedVenue.getName());
        existingVenue.setLocation(updatedVenue.getLocation());
        existingVenue.setDescription(updatedVenue.getDescription());

        return venueRepository.save(existingVenue);
    }

    public void deleteVenue(Integer id) {
        Venue existingVenue = venueRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venue not found"));
        venueRepository.delete(existingVenue);
    }

    //Seat Section methods 
    public List<SeatSection> getVenueSeatSections(Integer id) {
        venueRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venue not found"));
        return seatSectionRepository.findByVenueId(id);
    }

    public List<SeatSection> createSeatSections(Integer venueId, List<SeatSection> sections) {
        Venue venue = venueRepository.findById(venueId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venue not found"));

        for (SeatSection section : sections) {
            section.setVenue(venue);
        }
        return seatSectionRepository.saveAll(sections);
    }

    public List<SeatSection> updateSeatSections(Integer venueId, List<SeatSection> sections) {
        venueRepository.findById(venueId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venue not found"));
        
        List<SeatSection> existingSections =
        seatSectionRepository.findByVenueId(venueId);

        if (existingSections.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Seat sections not found for venue");
        }

        for (SeatSection incoming : sections) {
            for (SeatSection existing : existingSections) {
                if (existing.getType().equals(incoming.getType())) {
                    existing.setCapacity(incoming.getCapacity());
                }
            }
        }
        return seatSectionRepository.saveAll(existingSections);
    }

    public void deleteSeatSections(Integer seatSectionId) {
        SeatSection existing = seatSectionRepository.findById(seatSectionId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seat section not found"));
    
        seatSectionRepository.delete(existing);
    }
}
