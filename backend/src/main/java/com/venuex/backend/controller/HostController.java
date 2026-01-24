package com.venuex.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.venuex.backend.DTO.HostRequestDTO;
import com.venuex.backend.service.HostService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class HostController {

    private final HostService hostService;

    public HostController(HostService hostService) {
        this.hostService = hostService;
    }

    //User request to be a host 
    @PostMapping("/user/hosts/request")
    @ResponseStatus(HttpStatus.CREATED)
    public String createHostRequest(HttpServletRequest request) {
        String hostEmail = (String) request.getAttribute("userEmail");
        String role = (String) request.getAttribute("userRole");
        return hostService.createHostRequest(hostEmail,role);
    }

    //ADMIN, get host requests 
    @GetMapping("/admin/hosts/request")
    @ResponseStatus(HttpStatus.OK)
    public List<HostRequestDTO> getALLHostRequests (HttpServletRequest request) {
        String role = (String) request.getAttribute("userRole");
        return hostService.getAllHostRequests(role);
    }

    @PutMapping("/admin/hosts/requests/{id}/approve")
    @ResponseStatus(HttpStatus.OK)
    public void approveHostRequest(@PathVariable Integer id,HttpServletRequest request) {

        String adminEmail = (String) request.getAttribute("userEmail");
        String role = (String) request.getAttribute("userRole");

        hostService.approveHostRequest(id, adminEmail, role);
    }

    @PutMapping("/admin/hosts/requests/{id}/deny")
    @ResponseStatus(HttpStatus.OK)
    public void denyHostRequest(@PathVariable Integer id, HttpServletRequest request) {

        String adminEmail = (String) request.getAttribute("userEmail");
        String role = (String) request.getAttribute("userRole");

        hostService.denyHostRequest(id, adminEmail, role); 
    }

    @DeleteMapping("/host/requests/{id}")
    @ResponseStatus(HttpStatus.OK) 
    public void deleteHostRequest(@PathVariable Integer id, HttpServletRequest request) {
        String userEmail = (String) request.getAttribute("userEmail");
        String role = (String) request.getAttribute("userRole");
        hostService.deleteHostRequest(id,userEmail,role);
    }
}
