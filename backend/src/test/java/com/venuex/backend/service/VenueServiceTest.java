package com.venuex.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    List<SeatSection> seatSectionList;

    @BeforeEach
    void setup() {
        venue = new Venue();
        venue.setId(1);
        venue.setName("stadium");
        venue.setLocation("plano");
        venue.setDescription("place in plano");

        seatSectionVIP = new SeatSection(1,"VIP", 5, venue);
        seatSectionPremium = new SeatSection(1,"Premium", 10, venue);
        setSeatSectionFloor = new SeatSection(1,"Floor", 15, venue);
        seatSectionGeneral = new SeatSection(1,"General", 20, venue);

        seatSectionList = new ArrayList<>();
        seatSectionList.add(seatSectionGeneral);
        seatSectionList.add(setSeatSectionFloor);
        seatSectionList.add(seatSectionPremium);
        seatSectionList.add(seatSectionVIP);
    }

    @Test
    void getAllVenues_Success_ReturnVenue() {
        List<Venue> venues = List.of(venue);
        when(venueRepository.findAll()).thenReturn(venues);
        List<Venue> result = venueService.getAllVenues();
        assertEquals(1, result.size());
        assertEquals("stadium", result.get(0).getName());
        assertEquals("plano", result.get(0).getLocation());
        assertEquals("place in plano", result.get(0).getDescription());
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
        assertEquals("stadium", result.getName());
        assertEquals("plano", result.getLocation());
        assertEquals("place in plano", result.getDescription());
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
        assertEquals("stadium", result.getName());
        assertEquals("plano TX", result.getLocation());
        assertEquals("place in Plano", result.getDescription());
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
        updated.setName("new stadium");
        updated.setLocation("dallas");
        updated.setDescription("located at dallas");

        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        when(venueRepository.existsByName("new stadium")).thenReturn(false);
        when(venueRepository.save(venue)).thenReturn(venue);
        Venue result = venueService.updateVenue(1, updated);

        assertEquals("new stadium", result.getName());
        assertEquals("dallas", result.getLocation());
        assertEquals("located at dallas", result.getDescription());

        verify(venueRepository, times(1)).findById(1);
        verify(venueRepository, times(1)).existsByName("new stadium");
        verify(venueRepository, times(1)).save(venue);
    }

    @Test
    void updateVenue_Failure_NotFound() {

        Venue updated = new Venue();
        updated.setName("new stadium");

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
        updated.setName("new stadium");

        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        when(venueRepository.existsByName("new stadium")).thenReturn(true);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class,() -> venueService.updateVenue(1, updated));

        assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());
        assertEquals("Venue already exists", exception.getReason());

        verify(venueRepository, times(1)).findById(1);
        verify(venueRepository, times(1)).existsByName("new stadium");
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

    @Test
    void getVenueSeatSections_existingVenue_returnsSections() {
        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        when(seatSectionRepository.findByVenueId(1)).thenReturn(seatSectionList);

        List<SeatSection> sections = venueService.getVenueSeatSections(1);

        assertEquals(4, sections.size());
        verify(seatSectionRepository).findByVenueId(1);
    }

    @Test
    void getVenueSeatSections_nonExistingVenue_throwsNotFound() {
        when(venueRepository.findById(1)).thenReturn(Optional.empty());

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
            venueService.getVenueSeatSections(1));

        assertEquals("404 NOT_FOUND \"Venue not found\"", exception.getMessage());
    }

    @Test
    void createSeatSections_validSections_returnsSaved() {
        List<SeatSection> sectionsToCreate = seatSectionList;

        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        when(seatSectionRepository.saveAll(sectionsToCreate)).thenReturn(sectionsToCreate);

        List<SeatSection> savedSections = venueService.createSeatSections(1, sectionsToCreate);

        assertEquals(4, savedSections.size());
        assertEquals("VIP", savedSections.get(3).getType());
        assertEquals(1, savedSections.get(2).getVenue().getId());
        verify(seatSectionRepository).saveAll(sectionsToCreate);
    }

    @Test
    void updateSeatSections_validUpdate_changesCapacity() {
        Map<String, Integer> capacities = new HashMap<>();
        capacities.put("VIP", 150);
        capacities.put("General", 250);

        when(venueRepository.findById(1)).thenReturn(Optional.of(venue));
        when(seatSectionRepository.findByVenueId(1)).thenReturn(seatSectionList);
        when(seatSectionRepository.saveAll(anyList())).thenAnswer(invocation -> invocation.getArgument(0));

        List<SeatSection> updatedSections = venueService.updateSeatSections(1, capacities);

        assertEquals(150, updatedSections.get(3).getCapacity());
        assertEquals(250, updatedSections.get(0).getCapacity());
        verify(seatSectionRepository).saveAll(anyList());
    }

    @Test
    void updateSeatSections_nonExistingVenue_throwsNotFound() {
        when(venueRepository.findById(1)).thenReturn(Optional.empty());

        Map<String, Integer> capacities = new HashMap<>();
        capacities.put("VIP", 100);

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
            venueService.updateSeatSections(1, capacities));

        assertEquals("404 NOT_FOUND \"Venue not found\"", exception.getMessage());
    }
}
