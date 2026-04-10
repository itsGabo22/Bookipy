package com.bookipy.application.dto;

import java.math.BigDecimal;
import java.util.List;

public class InvoiceDTO {
    private String reservationId;
    private String guestName;
    private Integer roomNumber;
    private List<String> details;
    private BigDecimal total;

    public InvoiceDTO() {}

    public InvoiceDTO(String reservationId, String guestName, Integer roomNumber, List<String> details, BigDecimal total) {
        this.reservationId = reservationId;
        this.guestName = guestName;
        this.roomNumber = roomNumber;
        this.details = details;
        this.total = total;
    }

    public String getReservationId() { return reservationId; }
    public void setReservationId(String reservationId) { this.reservationId = reservationId; }
    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }
    public Integer getRoomNumber() { return roomNumber; }
    public void setRoomNumber(Integer roomNumber) { this.roomNumber = roomNumber; }
    public List<String> getDetails() { return details; }
    public void setDetails(List<String> details) { this.details = details; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
}
