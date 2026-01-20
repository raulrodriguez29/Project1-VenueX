package com.venuex.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.venuex.backend.entities.HostRequest;
import com.venuex.backend.service.HostService;

@RestController
@RequestMapping("/api")
public class HostController {

    private final HostService hostService;

    public HostController(HostService hostService) {
        
        this.hostService = hostService;
    }

    @GetMapping("/requests")
    public List<HostRequest> getAllHostRequests() {
        return hostService.getAllHostRequests();
    }

    @GetMapping("/requests/{id}")
    public HostRequest getHostRequest(@PathVariable Integer id) {
        return hostService.getHostRequest(id);
    }
}
