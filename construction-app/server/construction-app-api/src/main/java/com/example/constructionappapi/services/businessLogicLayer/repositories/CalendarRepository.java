package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.dao.CalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CalendarRepository {

    @Autowired
    private CalendarDao calendarDao;

    private final Calendar calendar = CalendarSingleton.getCalendar(); //TODO: fixa kalender ordentligt.

    public CalendarRepository() {
        calendar.setCalendarRepository(this);
    }

    public CalendarEntity save(CalendarEntity calendar) {
        return calendarDao.save(calendar);
    }


    public CalendarEntity editCalendar(CalendarEntity calendar) {
        return calendarDao.save(calendar);
    }

    public String getAllWorkDates() {
        return calendar.workToString();
    }

    public String getAllVacationDates() {
        return calendar.vacationToString();
    }
    public String getAllCalendarEntites() {
        return calendar.toString();
    }

    public Optional<CalendarEntity> findFirstByDate(LocalDate date) {
        return calendarDao.findFirstByDate(date);
    }

    public List<CalendarEntity> findAll() {
        return calendarDao.findAll();
    }

    public Optional<CalendarEntity> getCalendar(Long id) {
        return calendarDao.findById(id);
    }

    public void deleteCalendar(Long id) {
        calendarDao.deleteById(id);
    }

    public void deleteAllByDate(LocalDate date) {
        calendarDao.deleteAllByDate(date);
    }

    public void deleteAllByWorkId(Long id) {
        calendarDao.deleteAllByWorkId(id);
        calendarDao.findAllById(Collections.singleton(id));
    }

<<<<<<< Updated upstream
    public List<CalendarEntity> findByDateBetween(LocalDate today, LocalDate thirtyDaysForward) {
        return calendarDao.findByDateBetween(today,thirtyDaysForward);
=======
    public List<CalendarEntity> getUpcomingWork() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        LocalDate thirtyDaysForward = tomorrow.plusDays(30);
        return calendarDao.findByDateBetween(tomorrow, thirtyDaysForward);
>>>>>>> Stashed changes
    }
}
