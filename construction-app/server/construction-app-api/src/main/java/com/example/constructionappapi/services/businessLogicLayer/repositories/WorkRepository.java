package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.WorkStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.*;
import com.example.constructionappapi.services.dataAccessLayer.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private CustomerNoteDao customerNoteDao;

    @Autowired
    private NoteSummaryDao noteSummaryDao;

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
            }

            if (newWork.getStartDate().equals(LocalDate.now())) {
                newWork.setWorkStatus(WorkStatus.STARTED);
            }

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
    public boolean deleteWorkEntity(Long id) {
        Optional<WorkEntity> work = getWorkEntity(id);
        if (work.isPresent()) {
            if (customerNoteDao.findFirstByWork(work.get()).isEmpty()) {
                workDao.delete(work.get());
                calendar.removeWork(work.get());
                updateStartingDates();
                return true;
            }
        }

        return false;
    }

    public Optional<WorkEntity> getLastInserted() {
        return workDao.findFirstByOrderByIdDesc();
    }

    public WorkEntity updateWork(long customerId, WorkEntity work) {
        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isPresent()) {
            work.setCustomer(customer.get());

            List<CustomerNoteEntity> noteList = customerNoteDao.findAllByWorkId(work.getId());
            if (!noteList.isEmpty()) {
                work.setCustomerNotes(noteList);
            }

            List<NoteSummaryEntity> sumList = noteSummaryDao.findAllByWorkNumber(work.getId());
            if (!sumList.isEmpty()) {
                work.setNoteSummaries(sumList);
            }

            Optional<WorkEntity> preUpdateWork = workDao.findById(work.getId());
            if (preUpdateWork.isPresent()) {
                if (preUpdateWork.get().getWorkStatus() != WorkStatus.COMPLETED) {
                    //Checks if the date has been changed and updates the calendar if it has.
                    if (!preUpdateWork.get().getStartDate().equals(work.getStartDate()) || preUpdateWork.get().getNumberOfDays() != work.getNumberOfDays()) {
                        if (preUpdateWork.get().getStartDate().equals(work.getStartDate())) {
                            if (work.getNumberOfDays() < preUpdateWork.get().getNumberOfDays()) {
                                calendar.reduceNumberOfDays(work, preUpdateWork.get().getNumberOfDays() - work.getNumberOfDays());
                            } else if (work.getNumberOfDays() > preUpdateWork.get().getNumberOfDays()) {
                                calendar.increaseNumberOfDays(work, work.getNumberOfDays() - preUpdateWork.get().getNumberOfDays());
                            }
                        } else {
                            calendar.changeStartingDate(work);
                        }
                    }

                    updateStartingDates();
                    calendar.getWorkMap().get(work.getId()).update(work);
                    return addNewWorkEntity(customerId, work);
                }
            }
        }

        return null;
    }

    public void updateStartingDates() {
        workDao.findAllUncompletedWork().forEach(work -> {
            Optional<CalendarEntity> calendarEntity = calendarDao.findFirstByWorkIdOrderByDate(work.getId());
            calendarEntity.ifPresent(entity -> {
                if (!work.getStartDate().equals(entity.getDate())) {
                    work.setStartDate(entity.getDate());
                    calendar.getWorkMap().get(work.getId()).setStartDate(work.getStartDate());
                    workDao.save(work);
                }
            });
        });
    }

    @Transactional
    public boolean updateWorkStatus() {
        List<WorkEntity> startedWork = workDao.findStartedWork();
        List<WorkEntity> workNotStarted = workDao.findNotStartedWork();

        for (WorkEntity workEntity : startedWork) {
            //TODO tänk igenom detta om d funkar för alla situationer
            if (!(workEntity.getNoteSummaries().isEmpty()) && workEntity.getNumberOfDays() == workEntity.getCustomerNotes().size()) {
                workEntity.setWorkStatus(WorkStatus.COMPLETED);
                return true;
            }
        }

        for (WorkEntity workEntity : workNotStarted) {
            if (workEntity.getStartDate().equals(LocalDate.now())) {
                workEntity.setWorkStatus(WorkStatus.STARTED);
                return true;
            }
        }
        return false;
    }

    public List<WorkEntity> checkForUpcomingWork() {
        LocalDate today = LocalDate.now();
        today = today.plusDays(1); // "Kommande" innebär att man inte kollar på dagen utan det som kommer att komma
        //Lägger därför en dag framåt från dagens datum.
        LocalDate tenDaysForward = today.plusDays(10);

        return workDao.findByStartDateBetween(today, tenDaysForward);
    }

    public List<WorkEntity> checkForOngoingWork() {
        return workDao.findStartedWork();
    }

    public List<WorkEntity> getAllWorkEntitiesByCustomerId(Long id) {
        return workDao.findAllByCustomerId(id);
    }
}