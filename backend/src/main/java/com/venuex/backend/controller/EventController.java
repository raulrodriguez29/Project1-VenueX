package com.venuex.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.venuex.backend.DTO.EventDTO;
import com.venuex.backend.DTO.EventSeatSectionDTO;
import com.venuex.backend.entities.Event;
import com.venuex.backend.service.EventService;

@RestController
//@RequestMapping("/api")
@RequestMapping("/temp")
public class EventController {
    private final EventService eventService;

    public EventController (EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/events")
    public List<EventDTO> getEvents(
        @RequestParam(required = false) Integer venueId,
        @RequestParam(required = false) String name) {
        return eventService.getEvents(venueId, name);
    }

    @GetMapping("/events/{id}")
    public EventDTO getEventById (@PathVariable Integer id) {
        return eventService.getEventById(id);
    }

    @PostMapping("/host/events")
    @ResponseStatus(HttpStatus.CREATED)
    public EventDTO addEvent(@RequestBody Event event) {
        return eventService.addEvent(event);
    }

    @PutMapping("/host/events/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EventDTO updateEvent (@PathVariable Integer id, @RequestBody Event event) {
        return eventService.updateEvent(id, event);
    }

    @DeleteMapping("/host/events/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Integer id) {
        eventService.deleteEvent(id);
    }

    @GetMapping("/events/{id}/event-seat-section")
    public List<EventSeatSectionDTO> getEventSeatById (@PathVariable Integer id) {
        return eventService.getEventSeatById(id);
    }
    
    @PostMapping("/host/events/{id}/event-seat-section")
    @ResponseStatus(HttpStatus.CREATED)
    public void addEventSeatSectionPrices (@PathVariable Integer id, @RequestBody List<EventSeatSectionDTO> eventSeatSections) {
        eventService.addEventSeatSectionPrices(id, eventSeatSections);
    }

    @PutMapping("/host/events/{id}/event-seat-section")
    @ResponseStatus(HttpStatus.OK)
    public List<EventSeatSectionDTO> updateEventSeatSectionPrices (@PathVariable Integer id, @RequestBody List<EventSeatSectionDTO> eventSeatSections) {
        return eventService.updateEventSeatSectionPrices(id, eventSeatSections);
    }
}
