package com.bookipy.domain.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class Reservation {
    private String id;
    private String guestName;
    private String guestEmail;
    private Integer roomNumber;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private boolean isActive;
    private boolean checkedIn;
    private boolean checkedOut;
    private String digitalKey;
    private List<AdditionalServiceItem> extraServices;
    private BigDecimal totalPrice;

    public Reservation() {}

    public Reservation(String id, String guestName, String guestEmail, Integer roomNumber, LocalDate checkInDate, LocalDate checkOutDate, boolean isActive, boolean checkedIn, boolean checkedOut, String digitalKey, List<AdditionalServiceItem> extraServices, BigDecimal totalPrice) {
        this.id = id;
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.roomNumber = roomNumber;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.isActive = isActive;
        this.checkedIn = checkedIn;
        this.checkedOut = checkedOut;
        this.digitalKey = digitalKey;
        this.extraServices = extraServices;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }
    public String getGuestEmail() { return guestEmail; }
    public void setGuestEmail(String guestEmail) { this.guestEmail = guestEmail; }
    public Integer getRoomNumber() { return roomNumber; }
    public void setRoomNumber(Integer roomNumber) { this.roomNumber = roomNumber; }
    public LocalDate getCheckInDate() { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; }
    public LocalDate getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    public boolean isCheckedIn() { return checkedIn; }
    public void setCheckedIn(boolean checkedIn) { this.checkedIn = checkedIn; }
    public boolean isCheckedOut() { return checkedOut; }
    public void setCheckedOut(boolean checkedOut) { this.checkedOut = checkedOut; }
    public String getDigitalKey() { return digitalKey; }
    public void setDigitalKey(String digitalKey) { this.digitalKey = digitalKey; }
    public List<AdditionalServiceItem> getExtraServices() { return extraServices; }
    public void setExtraServices(List<AdditionalServiceItem> extraServices) { this.extraServices = extraServices; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
}
