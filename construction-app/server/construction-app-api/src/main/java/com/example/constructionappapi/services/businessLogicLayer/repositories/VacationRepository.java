package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.dao.CalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationCalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationCalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private WorkRepository workRepository;

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
    public ResponseEntity<?> saveVacation(VacationEntity vacationEntity) {
        if (isDateIntervalTakenByVacation(vacationEntity)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Det ligger redan en semester här.");
        }

        if (isDateIntervalTakenByWork(vacationEntity)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Det ligger redan ett låst jobb här.");
        }

        VacationEntity savedVacationEntity = vacationDao.save(vacationEntity);

        ArrayList<VacationCalendarEntity> vacationDates = new ArrayList<>();
        for (int i = 0; i < savedVacationEntity.getNumberOfDays(); i++) {
            vacationDates.add(new VacationCalendarEntity(0L, savedVacationEntity.getStartDate().plusDays(i), savedVacationEntity));
        }

        calendar.addVacation(savedVacationEntity, vacationCalendarDao.saveAll(vacationDates));

        return ResponseEntity.ok().body(savedVacationEntity);
    }

    public ResponseEntity<?> updateVacation(VacationEntity vacationEntity) {
        if (isDateIntervalTakenByVacation(vacationEntity)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Det ligger redan en semester här.");
        }

        if (isDateIntervalTakenByWork(vacationEntity)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Det ligger redan ett låst jobb här.");
        }

        deleteVacation(vacationEntity.getId());
        return saveVacation(vacationEntity);
    }

    private boolean isDateIntervalTakenByVacation(VacationEntity vacationEntity) {
        return vacationCalendarDao
                .findFirstByDateLessThanEqualAndDateGreaterThanEqual(
                        vacationEntity.getStartDate().plusDays(vacationEntity.getNumberOfDays()),
                        vacationEntity.getStartDate()
                ).isPresent();
    }

    private boolean isDateIntervalTakenByWork(VacationEntity vacationEntity) {
        for (int i = 0; i < vacationEntity.getNumberOfDays(); i++) {
            if (calendar.getCalendarMap().containsKey(new CalendarEntity(vacationEntity.getStartDate().plusDays(i)))) {
                Long workKey = calendar.getCalendarMap().get(new CalendarEntity(vacationEntity.getStartDate().plusDays(i)));

                if (calendar.getWorkMap().containsKey(workKey)) {
                    WorkEntity work = calendar.getWorkMap().get(workKey);

                    if (work.isLockedInCalendar()) {
                        return true;
                    }
                }
            }
        }

        return false;
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
    public boolean deleteVacation(Long id) {
        Optional<VacationEntity> vacationEntity = vacationDao.findById(id);

        if (vacationEntity.isPresent()) {
            vacationDao.deleteById(id);
            calendar.removeVacation(vacationEntity.get());
        } else {
            return false;
        }

        return true;
    }

    public List<VacationEntity> findAllVacationEntities() {
        return vacationDao.findAll();
    }

    public List<VacationCalendarEntity> findAllVacationCalendarEntities() {
        return vacationCalendarDao.findAll();
    }
}
