package com.example.constructionappapi.services.businessLogicLayer.repositories.calendar;


import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;

import java.util.List;
import java.util.Optional;

/**
 * A interface to function as a model for all the repositories
 */
public interface ICalendarRepository {

    CalendarEntity createCalendar(CalendarEntity calendar);

    CalendarEntity editCalendar(CalendarEntity calendar);

    List<CalendarEntity> getAllCalendarEntites();

    Optional<CalendarEntity> getCalendar(Long id);

    void deleteCalendar(Long id);
}
