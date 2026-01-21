package com.venuex.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.venuex.backend.DTO.HostRequestDTO;
import com.venuex.backend.entities.HostRequest;
import com.venuex.backend.entities.User;
import com.venuex.backend.service.HostService;

@RestController
@RequestMapping("/api")
public class HostController {

    private final HostService hostService;

    public HostController(HostService hostService) {
        
        this.hostService = hostService;
    }

    @GetMapping("/admin/hosts/requests")
    @ResponseStatus(HttpStatus.OK)
    public List<HostRequestDTO> getAllHostRequests() {
        List<HostRequest> hostRequests = hostService.getAllHostRequests();
        List<HostRequestDTO> dtos = new ArrayList<>();

        for (HostRequest hostRequest : hostRequests) {
            HostRequestDTO dto = hostService.mapToDTO(hostRequest);
            dtos.add(dto);
        }

        return dtos;
    }

    @PostMapping("/user/hosts/requests")
    @ResponseStatus(HttpStatus.CREATED)
    public HostRequestDTO createHostRequest(@RequestBody HostRequest hostRequest) {
        HostRequest saved = hostService.createHostRequest(hostRequest);
        return hostService.mapToDTO(saved);
    }

    @PatchMapping("/admin/hosts/requests/{id}/approve")
    @ResponseStatus(HttpStatus.OK)
    public HostRequestDTO approveHostRequest(@RequestBody HostRequest pending, @RequestBody User admin) {
        HostRequest saved = hostService.approveHostRequest(pending.getId(), admin);
        return hostService.mapToDTO(saved);
    }

    @PatchMapping("/admin/hosts/requests/{id}/deny")
    @ResponseStatus(HttpStatus.OK)
    public HostRequestDTO denyHostRequest(@RequestBody HostRequest pending, @RequestBody User admin) {
        HostRequest saved = hostService.approveHostRequest(pending.getId(), admin);
        return hostService.mapToDTO(saved);
    }

}
