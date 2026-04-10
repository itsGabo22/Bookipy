package com.bookipy.domain.service;

import com.bookipy.domain.model.Room;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {

    private final Map<Integer, Room> rooms = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        // Initialize 15 rooms
        for (int i = 101; i <= 105; i++) {
            rooms.put(i, new Room(i, "STANDARD", new BigDecimal("100.00"), true));
        }
        for (int i = 106; i <= 110; i++) {
            rooms.put(i, new Room(i, "DOUBLE", new BigDecimal("150.00"), true));
        }
        for (int i = 111; i <= 115; i++) {
            rooms.put(i, new Room(i, "SUITE", new BigDecimal("250.00"), true));
        }
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate start, LocalDate end) {
        // Since it's an in-memory simplified exercise, we return rooms where isAvailable is true
        return rooms.values().stream()
                .filter(Room::isAvailable)
                .collect(Collectors.toList());
    }

    @Override
    public void reserveRoom(Integer roomNumber) {
        Room room = rooms.get(roomNumber);
        if (room != null) {
            room.setAvailable(false);
        }
    }

    @Override
    public void releaseRoom(Integer roomNumber) {
        Room room = rooms.get(roomNumber);
        if (room != null) {
            room.setAvailable(true);
        }
    }

    @Override
    public boolean isRoomAvailable(Integer roomNumber) {
        Room room = rooms.get(roomNumber);
        return room != null && room.isAvailable();
    }
}
