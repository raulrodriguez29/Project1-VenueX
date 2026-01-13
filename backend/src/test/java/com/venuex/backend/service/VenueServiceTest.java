package com.venuex.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.entities.Venue;
import com.venuex.backend.entities.SeatSection;
import com.venuex.backend.repository.SeatSectionRepository;
import com.venuex.backend.repository.VenueRepository;

@ExtendWith(MockitoExtension.class)
public class VenueServiceTest {

    @Mock
    private VenueRepository venueRepository;

    @Mock
    private SeatSectionRepository seatSectionRepository;

    @InjectMocks
    private VenueService venueService;

    Venue venue;
    SeatSection seatSectionVIP;
    SeatSection seatSectionPremium;
    SeatSection setSeatSectionFloor;
    SeatSection seatSectionGeneral;

    @BeforeEach
    void setup() {
        venue = new Venue();
        venue.setId(1);
        venue.setName("Stadium");
        venue.setLocation("Plano TX");
        venue.setDescription("Place in Plano");

        seatSectionVIP = new SeatSection("VIP", 5, venue);
        seatSectionPremium = new SeatSection("Premium", 10, venue);
        setSeatSectionFloor = new SeatSection("Floor", 15, venue);
        seatSectionGeneral = new SeatSection("General", 20, venue);
    }

    @Test
    void getAllVenues_Success_ReturnVenue() {
        List<Venue> venues = List.of(venue);
        when(venueRepository.findAll()).thenReturn(venues);
        List<Venue> result = venueService.getAllVenues();
        assertEquals(1, result.size());
        assertEquals("Stadium", result.get(0).getName());
        assertEquals("Plano TX", result.get(0).getLocation());
        assertEquals("Place in Plano", result.get(0).getDescription());
        verify(venueRepository, times(1)).findAll();
    }

    @Test
    void getAllVenues_Failure_ReturnEmpty() {
        when(venueRepository.findAll()).thenReturn(List.of());
        List<Venue> result = venueService.getAllVenues();
        assertEquals(0, result.size());
        verify(venueRepository, times(1)).findAll();
    }

    @Test
    void getVenuesById_Success_ReturnVenue() {
        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        Venue result = venueService.findById(1);
        assertEquals(1, result.getId());
        assertEquals("Stadium", result.getName());
        assertEquals("Plano TX", result.getLocation());
        assertEquals("Place in Plano", result.getDescription());
        verify(venueRepository, times(1)).findById(1);
    }

    @Test
    void getVenuesById_Failure_ReturnVenue() {
        when(venueRepository.findById(1)).thenReturn(Optional.empty());
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,() -> venueService.findById(1));
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Venue not found", exception.getReason());
        verify(venueRepository, times(1)).findById(1);
    }

    @Test
    void createVenue_Success_ReturnVenue() {
        when(venueRepository.existsByName(venue.getName())).thenReturn(false);
        when(venueRepository.save(venue)).thenReturn(venue);
        Venue result = venueService.createVenue(venue);
        assertEquals("Stadium", result.getName());
        assertEquals("Plano TX", result.getLocation());
        assertEquals("Place in Plano", result.getDescription());
        verify(venueRepository, times(1)).existsByName(venue.getName());
        verify(venueRepository, times(1)).save(venue);
    }

    @Test
    void createVenue_Failure_DuplicateVenue() {
        when(venueRepository.existsByName(venue.getName())).thenReturn(true);
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,() -> venueService.createVenue(venue));
        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        assertEquals("Venue already exists", exception.getReason());
        verify(venueRepository, times(1)).existsByName(venue.getName());
        verify(venueRepository, never()).save(any());
    }

    @Test
    void updateVenue_Success_ReturnUpdatedVenue() {
        Venue updated = new Venue();
        updated.setName("New Stadium");
        updated.setLocation("Dallas TX");
        updated.setDescription("Located at Dallas");

        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        when(venueRepository.existsByName("New Stadium")).thenReturn(false);
        when(venueRepository.save(venue)).thenReturn(venue);
        Venue result = venueService.updateVenue(1, updated);

        assertEquals("New Stadium", result.getName());
        assertEquals("Dallas TX", result.getLocation());
        assertEquals("Located at Dallas", result.getDescription());

        verify(venueRepository, times(1)).findById(1);
        verify(venueRepository, times(1)).existsByName("New Stadium");
        verify(venueRepository, times(1)).save(venue);
    }

    @Test
    void updateVenue_Failure_NotFound() {

        Venue updated = new Venue();
        updated.setName("New Stadium");

        when(venueRepository.findById(1)).thenReturn(Optional.empty());
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,() -> venueService.updateVenue(1, updated));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Venue not found", exception.getReason());

        verify(venueRepository, times(1)).findById(1);
        verify(venueRepository, never()).save(any());
    }

    @Test
    void updateVenue_Failure_NameConflict() {
        Venue updated = new Venue();
        updated.setName("New Stadium");

        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        when(venueRepository.existsByName("New Stadium")).thenReturn(true);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,() -> venueService.updateVenue(1, updated));

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        assertEquals("Venue already exists", exception.getReason());

        verify(venueRepository, times(1)).findById(1);
        verify(venueRepository, times(1)).existsByName("New Stadium");
        verify(venueRepository, never()).save(any());
    }

    @Test
    void deleteVenue_Success() {
        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        venueService.deleteVenue(1);

        verify(venueRepository, times(1)).findById(1);
        verify(venueRepository, times(1)).delete(venue);
    }

    @Test
    void deleteVenue_Failure_NotFound() {
        when(venueRepository.findById(1)).thenReturn(Optional.empty());
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,() -> venueService.deleteVenue(1));

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());
        assertEquals("Venue not found", exception.getReason());

        verify(venueRepository, times(1)).findById(1);
        verify(venueRepository, never()).delete(any());
    }
}
