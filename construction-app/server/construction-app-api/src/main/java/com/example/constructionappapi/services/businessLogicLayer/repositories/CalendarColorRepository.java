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

    /**
     * Saves colors used for the calendar to the database.
     *
     * @param calendarColor Colors used in the calendar.
     * @return The saved colors.
     */
    public ResponseEntity<CalendarColorEntity> saveCalendarColor(CalendarColorEntity calendarColor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(calendarColorDao.save(calendarColor));
    }

    /**
     * Returns colors used for the calendar.
     *
     * @return Colors used for the calendar.
     */
    public ResponseEntity<CalendarColorEntity> getColorEntity() {
        Optional<CalendarColorEntity> calendarColor = calendarColorDao.findById(1L);
        if (calendarColor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok().body(calendarColor.get());
    }


    /**
     * Looks for a CalendarColorEntity in the database based on its ID.
     *
     * @param id ID of the CalendarColorEntity.
     * @return Optional with the CalendarColorEntity of the user or empty if not found.
     */
    public Optional<CalendarColorEntity> findById(long id) {
        return calendarColorDao.findById(id);
    }
}
