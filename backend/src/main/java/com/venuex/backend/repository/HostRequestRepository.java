package com.venuex.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.venuex.backend.entities.HostRequest;
import com.venuex.backend.entities.HostRequest.HostRequestStatus;
import com.venuex.backend.entities.User;

public interface HostRequestRepository extends JpaRepository<HostRequest, Integer> {
    boolean existsByUserAndStatus(User user, HostRequestStatus status);
}
