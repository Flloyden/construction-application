package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationCalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationCalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VacationRepository {
    @Autowired
    private VacationDao vacationDao;
    @Autowired
    private VacationCalendarDao vacationCalendarDao;

    private Calendar calendar = CalendarSingleton.getCalendar();

    public VacationRepository() {
        calendar.setVacationRepository(this);
    }

    /**
     * Saves/Updates(if ID already exists) a vacation date
     *
     * @param vacationEntity
     * @return
     */
    public VacationEntity saveVacation(VacationEntity vacationEntity) {
        if (vacationCalendarDao.findFirstByDateLessThanEqualAndDateGreaterThanEqual(vacationEntity.getStartDate().plusDays(vacationEntity.getNumberOfDays()), vacationEntity.getStartDate()).isEmpty()) {
            VacationEntity savedVacationEntity = vacationDao.save(vacationEntity);

            ArrayList<VacationCalendarEntity> vacationDates = new ArrayList<>();
            for (int i = 0; i < savedVacationEntity.getNumberOfDays(); i++) {
                vacationDates.add(new VacationCalendarEntity(0L, savedVacationEntity.getStartDate().plusDays(i), savedVacationEntity));
            }

            calendar.addVacation(savedVacationEntity, vacationCalendarDao.saveAll(vacationDates));

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

    public List<VacationEntity> findAllVacationEntities() {
        return vacationDao.findAll();
    }

    public List<VacationCalendarEntity> findAllVacationCalendarEntities() {
        return vacationCalendarDao.findAll();
    }
}
