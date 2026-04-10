package com.bookipy.domain.service;

import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class AccessService {
    public String generateDigitalKey() {
        return "BK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
