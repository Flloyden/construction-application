package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.WorkStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationCalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * This class is the middle-man between the Presentation Layer and the Data Access Layer.
 */
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
    public ResponseEntity<?> saveVacation(VacationEntity vacationEntity) {
        if (vacationEntity.getStartDate().isBefore(LocalDate.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Startdatumet kan inte ligga före dagens datum.");
        }

        if (isDateIntervalTakenByVacation(vacationEntity)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Det ligger redan en semester här.");
        }

        if (isDateIntervalTakenByWork(vacationEntity)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Det ligger redan ett låst jobb här.");
        }

        if (vacationEntity.getStartDate().isAfter(LocalDate.now())) {
            vacationEntity.setWorkStatus(WorkStatus.NOTSTARTED);
        }
        if (vacationEntity.getStartDate().equals(LocalDate.now())) {
            vacationEntity.setWorkStatus(WorkStatus.STARTED);
        }

        VacationEntity savedVacationEntity = vacationDao.save(vacationEntity);

        ArrayList<VacationCalendarEntity> vacationDates = new ArrayList<>();
        for (int i = 0; i < savedVacationEntity.getNumberOfDays(); i++) {
            vacationDates.add(new VacationCalendarEntity(0L, savedVacationEntity.getStartDate().plusDays(i), savedVacationEntity));
        }

        calendar.addVacation(savedVacationEntity, vacationCalendarDao.saveAll(vacationDates));

        return ResponseEntity.ok().body(savedVacationEntity);
    }

    /**
     * Updates a vacation entity by removing the old one and adding a new one.
     *
     * @param vacationEntity VacationEntity to update.
     * @return The updated VacationEntity.
     */
    public ResponseEntity<?> updateVacation(VacationEntity vacationEntity) {
        if (vacationEntity.getStartDate().isBefore(LocalDate.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Startdatumet kan inte ligga före dagens datum.");
        }

        if (isDateIntervalTakenByVacation(vacationEntity)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Det ligger redan en semester här.");
        }

        if (isDateIntervalTakenByWork(vacationEntity)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Det ligger redan ett låst jobb här.");
        }

        deleteVacation(vacationEntity.getId());
        return saveVacation(vacationEntity);
    }

    /**
     * Checks if there's already any other vacations within the interval of dates of a vacation entity.
     *
     * @param vacationEntity Vacation to check the interval of.
     * @return true if there's already another vacation within the interval, false otherwise.
     */
    private boolean isDateIntervalTakenByVacation(VacationEntity vacationEntity) {
        List<VacationCalendarEntity> vacationList = vacationCalendarDao.findAllByDateLessThanEqualAndDateGreaterThanEqual(
                vacationEntity.getStartDate().plusDays(vacationEntity.getNumberOfDays()),
                vacationEntity.getStartDate());

        if (!vacationList.isEmpty()) {
            for (VacationCalendarEntity vacation : vacationList) {
                if (vacation.getVacation().getId() != vacationEntity.getId()) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Checks if there's already a locked work within the interval of dates of a vacation entity.
     *
     * @param vacationEntity Vacation to check the interval of.
     * @return true if there's already a locked work within the interval, false otherwise.
     */
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

    /**
     * Returns all vacation calendar entities.
     *
     * @return All vacation calendar entities.
     */
    public List<VacationCalendarEntity> findAllVacationCalendarEntities() {
        return vacationCalendarDao.findAll();
    }

    /**
     * Checks all vacations that has not started yet. Updates vacation statuses to Started depending on their start date and the current date.
     *
     * @return true if one or more vacation statuses were set.
     */
    public ResponseEntity<?> findVacationsAndUpdateToStarted() {
        boolean success = false;
        List<VacationEntity> vacationsNotStarted = vacationDao.findNotStartedVacations();

        for (VacationEntity vacation : vacationsNotStarted) {
            if (vacation.getStartDate().equals(LocalDate.now()) || vacation.getStartDate().isBefore(LocalDate.now())) {
                vacation.setWorkStatus(WorkStatus.STARTED);
                vacationDao.save(vacation);
                success = true;
            }
        }
        if (success) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Checks all started vacations. Updates vacation statuses to Completed depending on the current date and when the vacation ends
     * .
     * @return true if one or more vacation statuses were set.
     */
    @Transactional
    public ResponseEntity findStartedVacationAndUpdateToCompleted() {
        boolean success = false;
        List<VacationEntity> startedVacations = vacationDao.findAllStartedVacations();

        for (VacationEntity vacation : startedVacations) {
            if (vacation.getStartDate().plusDays(vacation.getNumberOfDays() - 1).isBefore(LocalDate.now())) {
                vacation.setWorkStatus(WorkStatus.COMPLETED);
                vacationDao.save(vacation);
                success = true;
            }
        }
        if (success) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Returns the number of unfinished vacation dates on the calendar.
     *
     * @return Number of unfinished vacation dates
     */
    public int getAmountOfVacationDays() {
        List<VacationEntity> vacations = vacationDao.findAllNotFinishedVacation();
        int days = 0;

        if (!vacations.isEmpty()) {
            for (VacationEntity vacation : vacations) {
                days += vacation.getNumberOfDays();
            }
            return days;
        }
        return 0;
    }
}
