package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.dao.CalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.presentationLayer.bodies.VacationCalendarInformation;
import com.example.constructionappapi.services.presentationLayer.bodies.WorkCalendarInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * This class is the middle-man between the Presentation Layer and the Data Access Layer.
 */
@Service
public class CalendarRepository {

    @Autowired
    private CalendarDao calendarDao;

    private final Calendar calendar = CalendarSingleton.getCalendar();

    public CalendarRepository() {
        calendar.setCalendarRepository(this);
    }


    /**
     * Saves a calendar item to the database.
     *
     * @param calendar Calendar item to save.
     * @return Calendar item that was saved.
     */
    public CalendarEntity save(CalendarEntity calendar) {
        return calendarDao.save(calendar);
    }

    /**
     * Return the work related calendar information to be displayed in the frontend.
     *
     * @return Work related calendar information to be displayed in the frontend
     */
    public List<WorkCalendarInformation> getAllWorkDates() {
        return calendar.getWorkCalendarInformation();
    }

    /**
     * Returns all vacations date items in the database.
     *
     * @return A list with all vacations date items.
     */
    public List<VacationCalendarInformation> getAllVacationDates() {
        return calendar.getVacationCalendarInformation();
    }

    /**
     * Looks for the first calendar item with the specified date in the database.
     *
     * @param date Date to look for.
     * @return The calendar item at the specified date, null if not found.
     */
    public CalendarEntity findFirstByDate(LocalDate date) {
        return calendarDao.findFirstByDate(date);
    }

    /**
     * Returns all calendar items in the database.
     *
     * @return A list with all calendar items.
     */
    public List<CalendarEntity> findAll() {
        return calendarDao.findAll();
    }

    /**
     * Deletes all calendar items in the database with the specified workId.
     *
     * @param workId WorkId to delete by.
     */
    public void deleteAllByWorkId(Long workId) {
        calendarDao.deleteAllByWorkId(workId);
        calendarDao.findAllById(Collections.singleton(workId));
    }

    /**
     * Deletes the last calendar item in the database with the specified workId.
     *
     * @param workId WorkId to delete by.
     * @return The deleted calendar item.
     */
    public Optional<CalendarEntity> deleteLastByWorkId(long workId) {
        Optional<CalendarEntity> calendarEntity = calendarDao.findFirstByWorkIdOrderByDateDesc(workId);
        calendarEntity.ifPresent(entity -> calendarDao.delete(entity));

        return calendarEntity;
    }

    /**
     * Looks for the last calendar item in the database with the specified workId.
     *
     * @param workId WorkId to look for.
     * @return The last calendar item in the database.
     */
    public Optional<CalendarEntity> findFirstByWorkIdByOrderByDateDesc(long workId) {
        return calendarDao.findFirstByWorkIdOrderByDateDesc(workId);
    }
}
