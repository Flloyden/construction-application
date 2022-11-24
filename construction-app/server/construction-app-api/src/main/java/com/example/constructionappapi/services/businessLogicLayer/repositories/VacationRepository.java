package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationCalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationCalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VacationRepository {
    @Autowired
    private VacationDao vacationDao;
    @Autowired
    private VacationCalendarDao vacationCalendarDao;

    private Calendar calendar = CalendarSingleton.getCalendar();

    /**
     * Saves/Updates(if ID already exists) a vacation date
     *
     * @param vacationEntity
     * @return
     */
    public VacationEntity saveVacation(VacationEntity vacationEntity) {
        if (vacationCalendarDao.findFirstByDateLessThanEqualAndDateGreaterThanEqual(vacationEntity.getStartDate().plusDays(vacationEntity.getNumberOfDays()), vacationEntity.getStartDate()).isEmpty()) {
            VacationEntity saveVacationEntity = vacationDao.save(vacationEntity);
            for (int i = 0; i < saveVacationEntity.getNumberOfDays(); i++) {
                VacationCalendarEntity vacationCalendarEntity = new VacationCalendarEntity(0L, saveVacationEntity.getStartDate().plusDays(i), saveVacationEntity);
                vacationCalendarDao.save(vacationCalendarEntity);
            }
            return saveVacationEntity;
        } else {
            System.out.println("!!!!!!!!!!!!!!!!Date taken!!!!!!!!!!!!!!!!!");
        }

        return null;
    }

    /**
     * Returns all vacations dates as a list containing VacationEntities
     *
     * @return
     */
    public List<VacationEntity> getAllVacationEntities() {
        return vacationDao.findAll();
    }

    /**
     * Returns specific vacation by ID
     *
     * @param id
     * @return
     */
    public Optional<VacationEntity> getVacation(Long id) {
        return vacationDao.findById(id);
    }

    /**
     * Deletes specific vacation by ID
     *
     * @param id
     */
    public void deleteVacation(Long id) {
        vacationDao.deleteById(id);
    }
}
