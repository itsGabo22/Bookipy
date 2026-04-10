package com.bookipy.domain.model;

import java.math.BigDecimal;

public class AdditionalServiceItem {
    private String type;
    private BigDecimal price;

    public AdditionalServiceItem() {}

    public AdditionalServiceItem(String type, BigDecimal price) {
        this.type = type;
        this.price = price;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
