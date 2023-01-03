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
    public ResponseEntity createWork(long customerId, WorkEntity work) {
        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        work.setCustomer(customer.get());

        if (work.getStartDate() == null) {
            work.setStartDate(findNewStartDate());
        }

        //TODO detta gör att nytt jobb i tom kalender som hamnar på dagens datum inte sätts till started
        //if (work.getStartDate().equals(LocalDate.now())) {
        //work.setWorkStatus(WorkStatus.STARTED);
        //}

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

    public ResponseEntity<WorkEntity> updateWork(long customerId, WorkEntity work) {
        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Optional<WorkEntity> workBeforeUpdate = workDao.findById(work.getId());
        if (workBeforeUpdate.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        if (work.getStartDate() == null) {
            work.setStartDate(findNewStartDate());
        }

        if (work.getEarliestStartDate() != null && work.getEarliestStartDate().isBefore(work.getStartDate())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        if (isDateTakenByLocked(work.getStartDate())) {
            Optional<WorkEntity> workAtStartDate = workDao.findById(calendarDao.findFirstByDate(work.getStartDate()).getWork().getId());

            if (workAtStartDate.isPresent() && !workAtStartDate.get().getId().equals(work.getId())) {
                return workAtStartDate.map(
                        lockedWork -> ResponseEntity.status(HttpStatus.CONFLICT).body(lockedWork)
                ).orElseGet(() -> ResponseEntity.status(HttpStatus.CONFLICT).build());
            }
        }

        if (workBeforeUpdate.get().getWorkStatus() == WorkStatus.COMPLETED) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(workBeforeUpdate.get());
        }

        List<CustomerNoteEntity> noteList = customerNoteDao.findAllByWorkId(work.getId());
        if (!noteList.isEmpty()) {
            work.setCustomerNotes(noteList);
        }

        List<NoteSummaryEntity> sumList = noteSummaryDao.findAllByWorkNumber(work.getId());
        if (!sumList.isEmpty()) {
            work.setNoteSummaries(sumList);
        }

        work.setCustomer(customer.get());
        calendar.getWorkMap().get(work.getId()).update(work);
        updateCalendar(workBeforeUpdate.get(), work);
        WorkEntity updatedWork = workDao.save(work);
        updateStartingDates();

        return ResponseEntity.ok().body(updatedWork);
    }

    private boolean isDateTakenByLocked(LocalDate date) {
        CalendarEntity calendarEntity = calendarDao.findFirstByDate(date);
        if (calendarEntity == null) {
            return false;
        }

        return workDao.findById(calendar.getCalendarMap().get(calendarEntity)).map(WorkEntity::isLockedInCalendar).orElse(false);
    }

    private void updateCalendar(WorkEntity workBeforeUpdate, WorkEntity workToUpdateWith) {
        if (!workBeforeUpdate.getStartDate().equals(workToUpdateWith.getStartDate())) {
            calendar.updateStartDate(workBeforeUpdate.getStartDate(), workToUpdateWith);
        } else if (workBeforeUpdate.getNumberOfDays() != workToUpdateWith.getNumberOfDays()) {
            updateNumberOfDays(workBeforeUpdate, workToUpdateWith.getNumberOfDays());
        } else if (workBeforeUpdate.isLockedInCalendar() != workToUpdateWith.isLockedInCalendar()){
            calendar.moveCalendarItemBackwards(workToUpdateWith.getStartDate());
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
                    calendar.getWorkMap().get(work.getId()).update(work);
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
        LocalDate thirtyDaysForward = today.plusDays(30);

        return workDao.findFirstByStartDateBetween(today, thirtyDaysForward);
    }

    public List<WorkEntity> checkForOngoingWork() {
        java.util.Calendar calendar = java.util.Calendar.getInstance();
        int dayOfWeek = calendar.get(java.util.Calendar.DAY_OF_WEEK);
        if (dayOfWeek== java.util.Calendar.SATURDAY)
        {
            return workDao.findWorkEntityForTodayIfSaturday(1);
        } else if(dayOfWeek==java.util.Calendar.SUNDAY)
        {
            return workDao.findWorkEntityForTodayIfSunday(1);
        } else {
            return workDao.findWorkEntityForToday(1);
        }
    }


    public List<WorkEntity> getAllWorkEntitiesByCustomerId(Long id) {
        return workDao.findAllByCustomerId(id);
    }
}