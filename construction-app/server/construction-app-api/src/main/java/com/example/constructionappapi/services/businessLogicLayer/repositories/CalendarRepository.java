package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.dao.CalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CalendarRepository{

    @Autowired
    private CalendarDao calendarDao;

    private final Calendar calendar = CalendarSingleton.getCalendar(); //TODO: fixa kalender ordentligt.

    public CalendarRepository() {
        calendar.setCalendarRepository(this);
    }

    public CalendarEntity save(CalendarEntity calendar) {
        return calendarDao.save(calendar);
    }

    public String getAllCalendarEntites() {
        return calendar.toString();
    }

    public CalendarEntity findFirstByDate(LocalDate date) {
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
}
