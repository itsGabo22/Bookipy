package com.bookipy.domain.model;

import java.math.BigDecimal;

public class Room {
    private Integer number;
    private String type; // Single, Double, Suite
    private BigDecimal basePrice;
    private boolean isAvailable;

    public Room() {}

    public Room(Integer number, String type, BigDecimal basePrice, boolean isAvailable) {
        this.number = number;
        this.type = type;
        this.basePrice = basePrice;
        this.isAvailable = isAvailable;
    }

    public Integer getNumber() { return number; }
    public void setNumber(Integer number) { this.number = number; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public BigDecimal getBasePrice() { return basePrice; }
    public void setBasePrice(BigDecimal basePrice) { this.basePrice = basePrice; }
    public boolean isAvailable() { return isAvailable; }
    public void setAvailable(boolean available) { isAvailable = available; }
}
