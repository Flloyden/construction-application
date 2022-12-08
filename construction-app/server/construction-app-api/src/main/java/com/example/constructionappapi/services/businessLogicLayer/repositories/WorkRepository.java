package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.Status;
import com.example.constructionappapi.services.dataAccessLayer.dao.CalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.VacationCalendarDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.WorkDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class WorkRepository {

    @Autowired
    private WorkDao workDao;
    @Autowired
    private CustomerDao customerDao;
    @Autowired
    private CalendarDao calendarDao;
    @Autowired
    private VacationCalendarDao vacationCalendarDao;
    @Autowired
    private CustomerRepository customerRepository;
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
        Optional<CustomerEntity> customer = customerRepository.getCustomer(customerId);
        if (customer.isPresent()) {
            work.setCustomer(customer.get());

            WorkEntity newWork = work;
            if (newWork.getStartDate() == null) {
                Optional<CalendarEntity> lastDateInCalendar = calendarDao.findFirstByOrderByDateDesc();

                LocalDate startDateOfNewWork;
                startDateOfNewWork = lastDateInCalendar.map(calendarEntity -> calendarEntity.getDate().plusDays(1)).orElseGet(LocalDate::now);

                HashSet<LocalDate> vacationDates = new HashSet<>();
                vacationCalendarDao.findAll().forEach(vacationCalendarEntity -> vacationDates.add(vacationCalendarEntity.getDate()));

                while (vacationDates.contains(startDateOfNewWork) || startDateOfNewWork.getDayOfWeek() == DayOfWeek.SATURDAY || startDateOfNewWork.getDayOfWeek() == DayOfWeek.SUNDAY) {
                    startDateOfNewWork = startDateOfNewWork.plusDays(1);
                }

                newWork.setStartDate(startDateOfNewWork);

            } else {
                System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!BEEEEEEEEEP!!!!!!!!!!!!!!!!!");
            }

            System.out.println("!!!!!!!!!!!!!!!Start date: " + newWork.getStartDate() + "!!!!!!!!!!!!!!!!!!!!!!!");
            newWork = workDao.save(newWork);
            calendar.addWork(newWork);
            return newWork;
        }

        return null;
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
            workDao.delete(work.get());
            calendar.removeWork(work.get());
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
                if (preUpdateWork.get().getWorkStatus() != Status.COMPLETED) {
                    WorkEntity updatedWork = null;
                    //Checks if the date has been changed and updates the calendar if it has.
                    if (!preUpdateWork.get().getStartDate().equals(work.getStartDate()) || preUpdateWork.get().getNumberOfDays() != work.getNumberOfDays()) {
                        updatedWork = addNewWorkEntity(customerId, work);
                        calendar.updateWork(work);
                    }

                    return updatedWork;
                }
            }
        }

        return null;
    }



    public List<WorkEntity> checkForOngoingWork() {
        LocalDate today = LocalDate.now();
        today.plusDays(1);
        return workDao.findByStartDate(today);
    }

    public List<WorkEntity> checkForUpcomingWork() {
        LocalDate today = LocalDate.now();
        today = today.plusDays(1);
        LocalDate thirtyDaysForward = today.plusDays(30);

        List<WorkEntity> work = workDao.findByStartDate(today);
       long id = work.get(0).getId();

        return workDao.findByIdIsNotAndStartDateBetween(id, today, thirtyDaysForward);
    }
}