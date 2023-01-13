package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.CalendarColorDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarColorEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * This class is the middle-man between the Presentation Layer and the Data Access Layer.
 */
@Service
public class CalendarColorRepository {
    @Autowired
    CalendarColorDao calendarColorDao;

    public ResponseEntity<CalendarColorEntity> createCalendarcolor(CalendarColorEntity calendarColor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(calendarColorDao.save(calendarColor));
    }

    public ResponseEntity<CalendarColorEntity> getColorEntity() {
        Optional<CalendarColorEntity> calendarColor = calendarColorDao.findById(1L);
        if (calendarColor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok().body(calendarColor.get());
    }

    public Optional<CalendarColorEntity> findById(long l) {
        return calendarColorDao.findById(1L);
    }
}
