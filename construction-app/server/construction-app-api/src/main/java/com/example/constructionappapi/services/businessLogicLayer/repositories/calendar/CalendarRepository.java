package com.example.constructionappapi.services.businessLogicLayer.repositories.calendar;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.dataAccessLayer.dao.CalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CalendarRepository implements ICalendarRepository {

    @Autowired
    private CalendarDao calendarDao;
    private final Calendar calendar = new Calendar(); //TODO: fixa kalender ordentligt.

    @Override
    public CalendarEntity createCalendar(CalendarEntity calendar) {
        return calendarDao.save(calendar);
    }

    @Override
    public CalendarEntity editCalendar(CalendarEntity calendar) {
        return calendarDao.save(calendar);
    }

    @Override
    public String getAllCalendarEntites() {
        return calendar.toString();
    }

    @Override
    public Optional<CalendarEntity> getCalendar(Long id) {
        return calendarDao.findById(id);
    }

    @Override
    public void deleteCalendar(Long id) {
        calendarDao.deleteById(id);
    }
}
