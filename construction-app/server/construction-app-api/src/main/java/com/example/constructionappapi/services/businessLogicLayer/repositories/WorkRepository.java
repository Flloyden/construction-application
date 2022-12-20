package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.WorkStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.*;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationCalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WorkRepository {

    @Autowired
    private WorkDao workDao;
    @Autowired
    private CustomerDao customerDao;
    @Autowired
    private CalendarDao calendarDao;
    @Autowired
    private CustomerNoteDao customerNoteDao;
    @Autowired
    private VacationCalendarDao vacationCalendarDao;

    private final Calendar calendar = CalendarSingleton.getCalendar();

    public WorkRepository() {
        calendar.setWorkRepository(this);
    }

    /**
     * Creates a Work "Instance" and saves it in our DB using a WorkEntity as param
     *
     * @return
     */
    public WorkEntity addNewWorkEntity(long customerId, WorkEntity work) {
        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isPresent()) {
            work.setCustomer(customer.get());

            if (work.getHardStartDate() == null) findNewStartDate(work);

            work = workDao.save(work);
            calendar.addWork(work);
            return work;
        }

        return null;
    }

    private void findNewStartDate(WorkEntity work) {
        if (work.getSoftStartDate() == null) {
            Optional<CalendarEntity> lastDateInCalendar = calendarDao.findFirstByOrderByDateDesc();
            LocalDate startDate = lastDateInCalendar.map(calendarEntity -> calendarEntity.getDate().plusDays(1)).orElseGet(LocalDate::now);
            HashSet<LocalDate> vacationDates = vacationCalendarDao.findAll().stream().map(VacationCalendarEntity::getDate).collect(Collectors.toCollection(HashSet::new));

            while (vacationDates.contains(startDate) || startDate.getDayOfWeek() == DayOfWeek.SATURDAY || startDate.getDayOfWeek() == DayOfWeek.SUNDAY) {
                startDate = startDate.plusDays(1);
            }

            work.setSoftStartDate(startDate);
        }
    }

    /**
     * Edits an existing Work "Instance" if the ID already exists in the DB, otherwise it will function as createWorkEntity()
     *
     * @param work
     * @return
     */
    public WorkEntity editWorkEntity(WorkEntity work) {
        return workDao.save(work);
    }

    /**
     * Returns all WorkEntities
     *
     * @return
     */
    public List<WorkEntity> getAllWorkEntities() {
        return workDao.findAll();
    }

    /**
     * Returns specific WorkEntity using ID
     *
     * @param id
     * @return
     */
    public Optional<WorkEntity> getWorkEntity(Long id) {
        return workDao.findById(id);
    }

    /**
     * Deletes specific WorkEntity using ID
     *
     * @param id
     */

    public void deleteWorkEntity(Long id) {
        Optional<WorkEntity> work = getWorkEntity(id);
        if (work.isPresent()) {
            if (customerNoteDao.findFirstByWork(work.get()).isEmpty()) {
                workDao.delete(work.get());
                calendar.removeWork(work.get());
            }
        }
    }

    public Optional<WorkEntity> getLastInserted() {
        return workDao.findFirstByOrderByIdDesc();
    }

    public WorkEntity updateWork(long customerId, WorkEntity work) {
        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isPresent()) {
            work.setCustomer(customer.get());

            Optional<WorkEntity> preUpdateWork = workDao.findById(work.getId());
            if (preUpdateWork.isPresent()) {
                if (preUpdateWork.get().getWorkStatus() != WorkStatus.COMPLETED) {
                    updateCalendar(preUpdateWork.get(), work);

                    return addNewWorkEntity(customerId, work);
                }
            }
        }

        return null;
    }

    /**
     * Update the calendar if the date of the work-item has been changed.
     *
     * @param preUpdateWork
     * @param work
     */
    public void updateCalendar(WorkEntity preUpdateWork, WorkEntity work) {
        if ((preUpdateWork.getHardStartDate() != null && !preUpdateWork.getHardStartDate().equals(work.getHardStartDate())) || preUpdateWork.getNumberOfDays() == work.getNumberOfDays()) {
            calendar.updateWork(preUpdateWork.getStartDate(), work);
        }
    }

    public List<WorkEntity> checkForUpcomingWork() {
        LocalDate today = LocalDate.now();
        today = today.plusDays(1); // "Kommande" innebär att man inte kollar på dagen utan det som kommer att komma
        //Lägger därför en dag framåt från dagens datum.
        LocalDate tenDaysForward = today.plusDays(10);

        return workDao.findBySoftStartDateBetweenOrHardStartDateBetween(today, tenDaysForward, today, tenDaysForward);
    }

    public List<WorkEntity> checkForOngoingWork() {
        return workDao.findWorkEntityForToday();
    }

    public List<WorkEntity> getAllWorkEntitiesByCustomerId(Long id) {
        return workDao.findAllByCustomerId(id);
    }
}