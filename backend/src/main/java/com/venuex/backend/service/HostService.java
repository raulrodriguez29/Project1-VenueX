package com.venuex.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.venuex.backend.DTO.HostRequestDTO;
import com.venuex.backend.entities.HostRequest;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.HostRequestRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class HostService {

    private final HostRequestRepository hostRequestRepository;

    @Autowired
    public HostService(HostRequestRepository hostRequestRepository) {
        this.hostRequestRepository = hostRequestRepository;
    }

    //MAP TO DTO
    public HostRequestDTO mapToDTO(HostRequest hostRequest) {
        HostRequestDTO hostRequestDTO = new HostRequestDTO();
        hostRequestDTO.setId(hostRequest.getId());
        hostRequestDTO.setUserId(hostRequest.getUser().getId());
        hostRequestDTO.setStatus(hostRequest.getStatus());
        hostRequestDTO.setRequestedAt(hostRequest.getRequestedAt());

        if(hostRequest.getReviewedBy() != null) {
            hostRequestDTO.setReviewedBy(hostRequest.getReviewedBy().getId());
        } else {
            hostRequestDTO.setReviewedBy(null);
        }

        return hostRequestDTO;
    }

    //CREATE
    public HostRequest createHostRequest(HostRequest hostRequest) {
        if (hostRequestRepository.existsById(hostRequest.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Host Request already exists");
        }
        return hostRequestRepository.save(hostRequest);

    }
 
    //READ
    public HostRequest getHostRequest(Integer id) {
        return hostRequestRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Host Request not found"));
    }

    public List<HostRequest> getAllHostRequests() {
        return hostRequestRepository.findAll();
    }

    // ! CHECK IF BETTER WAY TO OBTAIN ADMIN !
    //UPDATE / APPROVE / DENY
    public HostRequest approveHostRequest(Integer id, User admin) { 
        HostRequest hostRequest = hostRequestRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Host Request not found"));

        hostRequest.setStatus("APPROVED");
        hostRequest.setReviewedBy(admin);

        return hostRequestRepository.save(hostRequest);
    }

    public HostRequest denyHostRequest(Integer id, User admin) {
        HostRequest hostRequest = hostRequestRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Host Request not found"));

        hostRequest.setStatus("DENIED");
        hostRequest.setReviewedBy(admin);

        return hostRequestRepository.save(hostRequest);
    }

    public HostRequest updateHostRequest(HostRequest hostRequest) {
        if(!hostRequestRepository.existsById(hostRequest.getId())) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Host Request not found");
        }

        return hostRequestRepository.save(hostRequest);
    }

    //DELETE
    public void deleteHostRequest(Integer id) {
        if(!hostRequestRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Host Request not found");
        }
        hostRequestRepository.deleteById(id);
    }
}
