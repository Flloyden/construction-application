package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.dao.CalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
<<<<<<< Updated upstream
import java.util.List;
import java.util.Optional;
=======
import java.util.*;
>>>>>>> Stashed changes

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

    public List<CalendarEntity> findByDate(LocalDate date) {
        return calendarDao.findByDate(date);
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
<<<<<<< Updated upstream
=======

    public void deleteAllByWorkId(Long id) {
        calendarDao.deleteAllByWorkId(id);
        calendarDao.findAllById(Collections.singleton(id));
    }

    public String getUpcomingWork()
    {
        LocalDate today = LocalDate.now(); //Hämtar dagens datum
        today = today.plusDays(1);       //Lägger till +1 dag så man inte har dagens datum.
        LocalDate aMonthForward = today.plusDays(30); // "En månad fram"
        List<CalendarEntity> calendarEntities = calendarDao.findByDateBetween(today, aMonthForward); // Hämtar calendarEntities som finns en månad fram.

        int today_id = (int) calendarDao.findFirstByDate(LocalDate.now()).getWork().getCustomer().getId();

        StringBuilder s = new StringBuilder();
        HashMap<CalendarEntity, WorkEntity> calendarDates = new HashMap<>();

        for (int i = 0;i<calendarEntities.size();i++)
        {
            int newWork_id = (int) calendarEntities.get(i).getWork().getCustomer().getId();

            if (today_id != newWork_id) // Kollar så att en ny kunds jobb endast läggs till i kommande jobb och inte den som redan är aktiv.
            {
                calendarDates.put(calendarEntities.get(i), calendarEntities.get(i).getWork());
            }
        }

        Iterator<Map.Entry<CalendarEntity, WorkEntity>> entrySetWork = calendarDates.entrySet().iterator();

        s.append("[");

        while (entrySetWork.hasNext()) {
            Map.Entry<CalendarEntity, WorkEntity> entry = entrySetWork.next();
            s.append("{");
            if (entry.getValue().getCustomer() != null) {
                s.append("\"customerName\":").append("\"").append(entry.getValue().getCustomer().getName()).append("\",");
            }
            s.append("\"workName\":\"").append(entry.getValue().getName()).append("\",");
            s.append("\"date\":\"").append(entry.getKey().getDate()).append("\",");
            s.append("\"color\":\"").append("#FF0000").append("\",");
            s.append("\"customerId\":\"").append(entry.getValue().getCustomer().getId()).append("\"");
            s.append("}");
            if (entrySetWork.hasNext()) s.append(",");
        }


        s.append("]");

        return s.toString();
    }
    public String getOngoingWork() {
        CalendarEntity calendarEntity = calendarDao.findFirstByDate(LocalDate.now());
        WorkEntity workEntity = calendarEntity.getWork();

        return calendarEntity + workEntity.toString();
    }
>>>>>>> Stashed changes
}
