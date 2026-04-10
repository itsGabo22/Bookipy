package com.bookipy.domain.service;

import com.bookipy.domain.model.Room;
import java.time.LocalDate;
import java.util.List;

public interface RoomService {
    List<Room> getAvailableRooms(LocalDate start, LocalDate end, String type);
    void reserveRoom(Integer roomNumber);
    void releaseRoom(Integer roomNumber);
    boolean isRoomAvailable(Integer roomNumber);
}
