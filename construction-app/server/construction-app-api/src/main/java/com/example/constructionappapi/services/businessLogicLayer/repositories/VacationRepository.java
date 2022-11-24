package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationCalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationCalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            VacationEntity savedVacationEntity = vacationDao.save(vacationEntity);

            for (int i = 0; i < savedVacationEntity.getNumberOfDays(); i++) {
                VacationCalendarEntity vacationCalendarEntity = new VacationCalendarEntity(0L, savedVacationEntity.getStartDate().plusDays(i), savedVacationEntity);
                vacationCalendarDao.save(vacationCalendarEntity);
            }

            calendar.addVacation(vacationDao.findById(savedVacationEntity.getId()).get());

            return savedVacationEntity;
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
        Optional<VacationEntity> vacationEntity = vacationDao.findById(id);

        if (vacationEntity.isPresent()) {
            vacationDao.deleteById(id);
            calendar.removeVacation(vacationEntity.get());
        }
    }
}
