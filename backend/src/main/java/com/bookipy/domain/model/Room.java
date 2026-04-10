package com.bookipy.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    private Integer number;
    private String type; // Single, Double, Suite
    private BigDecimal basePrice;
    private boolean isAvailable;
}
