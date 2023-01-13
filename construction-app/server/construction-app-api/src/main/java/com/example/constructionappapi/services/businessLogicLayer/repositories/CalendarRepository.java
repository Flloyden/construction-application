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

    public CalendarEntity save(CalendarEntity calendar) {
        return calendarDao.save(calendar);
    }


    public List<WorkCalendarInformation> getAllWorkDates() {
        return calendar.getWorkCalendarInformation();
    }

    public List<VacationCalendarInformation> getAllVacationDates() {
        return calendar.getVacationCalendarInformation();
    }

    public CalendarEntity findFirstByDate(LocalDate date) {
        return calendarDao.findFirstByDate(date);
    }

    public List<CalendarEntity> findAll() {
        return calendarDao.findAll();
    }

    public void deleteAllByWorkId(Long id) {
        calendarDao.deleteAllByWorkId(id);
        calendarDao.findAllById(Collections.singleton(id));
    }

    public Optional<CalendarEntity> deleteLastByWorkId(long workId) {
        Optional<CalendarEntity> calendarEntity = calendarDao.findFirstByWorkIdOrderByDateDesc(workId);
        calendarEntity.ifPresent(entity -> calendarDao.delete(entity));

        return calendarEntity;
    }

    public Optional<CalendarEntity> findFirstByWorkIdByOrderByDateDesc(long workId) {
        return calendarDao.findFirstByWorkIdOrderByDateDesc(workId);
    }
}
