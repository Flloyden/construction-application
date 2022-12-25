package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.WorkStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.*;
import com.example.constructionappapi.services.dataAccessLayer.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
    public ResponseEntity<WorkEntity> addNewWorkEntity(long customerId, WorkEntity work) {
        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        work.setCustomer(customer.get());

        if (work.getStartDate() == null) {
            work.setStartDate(findNewStartDate());
        }

        if (work.getStartDate().equals(LocalDate.now())) {
            work.setWorkStatus(WorkStatus.STARTED);
        }

        return calendar.addWork(workDao.save(work));

    }

    private LocalDate findNewStartDate() {
        LocalDate startDateOfNewWork = calendarDao.findFirstByOrderByDateDesc()
                .map(calendarEntity -> calendarEntity.getDate().plusDays(1))
                .orElseGet(LocalDate::now);

        Set<LocalDate> vacationDates = vacationCalendarDao.findAll()
                .stream()
                .map(VacationCalendarEntity::getDate)
                .collect(Collectors.toSet());

        return startDateOfNewWork
                .datesUntil(LocalDate.MAX)
                .filter(date -> !vacationDates.contains(date) && date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY)
                .findFirst()
                .orElse(startDateOfNewWork);
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
    public ResponseEntity<String> deleteWorkEntity(Long id) {
        Optional<WorkEntity> work = getWorkEntity(id);
        if (work.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("That work entity doesn't exist");
        }

        if (customerNoteDao.findFirstByWork(work.get()).isPresent()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Can't delete a work-entity with notes");
        }

        workDao.delete(work.get());
        calendar.removeWork(work.get());
        updateStartingDates();
        return ResponseEntity.ok().body("Work deleted");
    }

    public Optional<WorkEntity> getLastInserted() {
        return workDao.findFirstByOrderByIdDesc();
    }

    public ResponseEntity<WorkEntity> updateWork(long customerId, WorkEntity work) {
        if (startDateTakenByLocked(work)) {
            return workDao.findById(calendarDao.findFirstByDate(work.getStartDate()).getWork().getId()).map(
                    lockedWork -> ResponseEntity.status(HttpStatus.CONFLICT).body(lockedWork)
            ).orElseGet(() -> ResponseEntity.status(HttpStatus.CONFLICT).build());
        }

        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<WorkEntity> workBeforeUpdate = workDao.findById(work.getId());
        if (workBeforeUpdate.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (workBeforeUpdate.get().getWorkStatus() == WorkStatus.COMPLETED) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(workBeforeUpdate.get());
        }

        work.setCustomer(customer.get());
        List<CustomerNoteEntity> noteList = customerNoteDao.findAllByWorkId(work.getId());
        if (!noteList.isEmpty()) {
            work.setCustomerNotes(noteList);
        }

        List<NoteSummaryEntity> sumList = noteSummaryDao.findAllByWorkNumber(work.getId());
        if (!sumList.isEmpty()) {
            work.setNoteSummaries(sumList);
        }

        updateCalendar(workBeforeUpdate.get(), work);
        updateStartingDates();
        calendar.getWorkMap().get(work.getId()).update(work);
        return addNewWorkEntity(customerId, work);
    }

    private boolean startDateTakenByLocked(WorkEntity work) {
        if (work.getStartDate() == null) {
            return false;
        }

        CalendarEntity calendarEntity = calendarDao.findFirstByDate(work.getStartDate());
        if (calendarEntity == null) {
            return false;
        }

        return workDao.findById(calendar.getCalendar().get(calendarEntity)).map(WorkEntity::isLockedInCalendar).orElse(false);
    }

    private void updateCalendar(WorkEntity workBeforeUpdate, WorkEntity workToUpdateWith) {
        if (!workBeforeUpdate.getStartDate().equals(workToUpdateWith.getStartDate())) {
            calendar.updateStartDate(workToUpdateWith);
        }

        if (workBeforeUpdate.getNumberOfDays() != workToUpdateWith.getNumberOfDays()) {
            updateNumberOfDays(workToUpdateWith, workToUpdateWith.getNumberOfDays());
        }
    }

    private void updateNumberOfDays(WorkEntity work, int newNumberOfDays) {
        if (newNumberOfDays < work.getNumberOfDays()) {
            calendar.reduceNumberOfDays(work, work.getNumberOfDays() - newNumberOfDays);
        } else if (newNumberOfDays > work.getNumberOfDays()) {
            calendar.increaseNumberOfDays(work, newNumberOfDays - work.getNumberOfDays());
        }
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
    public boolean findWorkAndUpdateToCompleted() {
        System.out.println("------ findWorkAndUpdateToCompleted() just ran... ------");
        List<WorkEntity> startedWork = workDao.findStartedWork();

        for (WorkEntity workEntity : startedWork) {
            //TODO tänk igenom detta om d funkar för alla situationer
            if (!(workEntity.getNoteSummaries().isEmpty()) && workEntity.getNumberOfDays() == workEntity.getCustomerNotes().size()) {
                workEntity.setWorkStatus(WorkStatus.COMPLETED);
                return true;
            }
        }
        return false;
    }

    public boolean findWorkAndUpdateToStarted() {
        System.out.println("------ findWorkAndUpdateToStarted() just ran... ------");
        List<WorkEntity> workNotStarted = workDao.findNotStartedWork();

        for (WorkEntity workEntity : workNotStarted) {
            if (workEntity.getStartDate().equals(LocalDate.now()) && workEntity.getWorkStatus() != WorkStatus.COMPLETED) {
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

        return workDao.findFirstByStartDateBetweenAndWorkStatus(today, tenDaysForward, 0);
    }

    public List<WorkEntity> checkForOngoingWork() {
        return workDao.findWorkEntityForToday();
    }

    public List<WorkEntity> getAllWorkEntitiesByCustomerId(Long id) {
        return workDao.findAllByCustomerId(id);
    }
}