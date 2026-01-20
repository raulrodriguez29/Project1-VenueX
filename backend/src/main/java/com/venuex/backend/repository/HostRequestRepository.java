package com.venuex.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.venuex.backend.entities.HostRequest;

public interface HostRequestRepository extends JpaRepository<HostRequest, Integer> {
    
}
