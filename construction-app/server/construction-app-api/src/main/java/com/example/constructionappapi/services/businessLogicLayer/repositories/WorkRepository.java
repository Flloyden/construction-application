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

/**
 * This class is the middle-man between the Presentation Layer and the Data Access Layer.
 */
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
    public ResponseEntity<?> createWork(long customerId, WorkEntity work) {
        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kunden kan inte hittas.");
        }

        work.setCustomer(customer.get());

        if (work.getStartDate() == null) {
            work.setStartDate(findNewStartDate());
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Jobbet du försöker ta bort kan inte hittas.");
        }

        if (customerNoteDao.findFirstByWork(work.get()).isPresent()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Det går inte att ta bort ett jobb med anteckningar.");
        }

        workDao.delete(work.get());
        calendar.removeWork(work.get());
        updateStartingDates();
        return ResponseEntity.ok().body(work.get().getName() + " har tagits bort.");
    }

    /**
     * Updates an existing work item.
     *
     * @param customerId ID of the customer related to the work.
     * @param work       The work to update with.
     * @return The updated work if successful, otherwise an error code and message.
     */
    public ResponseEntity<?> updateWork(long customerId, WorkEntity work) {
        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kunden kan inte hittas.");
        }

        Optional<WorkEntity> workBeforeUpdate = workDao.findById(work.getId());
        if (workBeforeUpdate.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Jobbet som du försöker ändra kan inte hittas.");
        }

        if (work.getName() == null || work.getName().equals("")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ett jobb måste ha ett namn.");
        }

        if (work.getStartDate() == null) {
            work.setStartDate(findNewStartDate());
        }

        if (work.getStartDate().isBefore(LocalDate.now()) && !workBeforeUpdate.get().getStartDate().equals(work.getStartDate())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Startdatumet kan inte ligga före dagens datum.");
        }

        if (work.getEarliestStartDate() != null && work.getEarliestStartDate().isBefore(work.getStartDate())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Startdatumet kan inte ligga före det tidigaste startdatumet.");
        }

        if (work.getStartDate().plusDays(work.getNumberOfDays() - 1).isBefore(LocalDate.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Du har angivit för få dagar. Antal dagar kan inte vara färre än så många dagar som har avklarats på jobbet.");
        }

        if (customerNoteDao.findAllByWorkId(work.getId()).size() > work.getNumberOfDays()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Du har angivit för få dagar. Antal dagar kan inte vara färre än antalet anteckningar som gjorts.");
        }

        if (isDateTakenByLocked(work.getStartDate())) {
            Optional<WorkEntity> workAtStartDate = workDao.findById(calendarDao.findFirstByDate(work.getStartDate()).getWork().getId());

            if (workAtStartDate.isPresent() && !workAtStartDate.get().getId().equals(work.getId())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Det ligger ett låst jobb på det valda startdatumet.");
            }
        }

        if (vacationCalendarDao.findFirstByDate(work.getStartDate()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Det ligger en semester på det valda startdatumet.");
        }

        if (workBeforeUpdate.get().getWorkStatus() == WorkStatus.COMPLETED) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Det är inte tillåtet att ändra ett avklarat jobb.");
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

    /**
     * Checks if there's already a locked work at the specified date.
     *
     * @param date Date to look for a locked work at.
     * @return true if a locked work was found, false otherwise.
     */
    private boolean isDateTakenByLocked(LocalDate date) {
        CalendarEntity calendarEntity = calendarDao.findFirstByDate(date);
        if (calendarEntity == null) {
            return false;
        }

        return workDao.findById(calendar.getCalendarMap().get(calendarEntity)).map(WorkEntity::isLockedInCalendar).orElse(false);
    }

    /**
     * Updates the calendar based on what has changed for the work being updated.
     *
     * @param workBeforeUpdate The work item pre-update.
     * @param workToUpdateWith The work item to update with.
     */
    private void updateCalendar(WorkEntity workBeforeUpdate, WorkEntity workToUpdateWith) {
        if (!workBeforeUpdate.getStartDate().equals(workToUpdateWith.getStartDate())) {
            calendar.changeStartDateOfWorkOnCalendar(workBeforeUpdate.getStartDate(), workToUpdateWith);
        } else if (workBeforeUpdate.getNumberOfDays() != workToUpdateWith.getNumberOfDays()) {
            updateNumberOfDays(workBeforeUpdate, workToUpdateWith.getNumberOfDays());
        } else if (workBeforeUpdate.isLockedInCalendar() != workToUpdateWith.isLockedInCalendar()) {
            calendar.moveCalendarItemBackwards(LocalDate.now());
        } else if (workBeforeUpdate.getEarliestStartDate() != null && workToUpdateWith.getEarliestStartDate() == null) {
            calendar.moveCalendarItemBackwards(LocalDate.now());
        }
    }

    /**
     * Changes the number of days of a work item on the calendar.
     *
     * @param work            Pre-update work item to change the number of days for.
     * @param newNumberOfDays The new amount of days.
     */
    private void updateNumberOfDays(WorkEntity work, int newNumberOfDays) {
        if (newNumberOfDays < work.getNumberOfDays()) {
            calendar.reduceNumberOfDaysOfWork(work, work.getNumberOfDays() - newNumberOfDays);
        } else if (newNumberOfDays > work.getNumberOfDays()) {
            calendar.increaseNumberOfDaysOfWork(work, newNumberOfDays - work.getNumberOfDays());
        }
    }

    /**
     * Updates the starting dates of all work items in the database.
     */
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

    /**
     * Checks if a work has as many summed customer notes as there are work days.
     * If so, the status of the work can be updated to Completed.
     *
     * @param workId ID of the work to update the status of.
     * @return Http-status if accepted request or not
     */
    @Transactional
    public ResponseEntity<?> findStartedWorkAndUpdateToCompleted(Long workId) {
        Optional<WorkEntity> thisWork = workDao.findById(workId);
        if (!thisWork.isEmpty() && thisWork.get().getWorkStatus() == WorkStatus.STARTED) {
            List<CustomerNoteEntity> summarizedNotes = customerNoteDao.findAllByWorkIdAndNoteStatus(1, workId);
            if (summarizedNotes.size() == thisWork.get().getNumberOfDays()) {
                thisWork.get().setWorkStatus(WorkStatus.COMPLETED);
                workDao.save(thisWork.get());
                return ResponseEntity.status(HttpStatus.ACCEPTED).build();
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Checks the start date on all work that has not been started yet.
     * If a work has a start date that is today, or before today, the status on the job is updated to Started.
     *
     * @return Http-status if accepted request or not
     */
    public ResponseEntity<?> findWorkAndUpdateToStarted() {
        boolean success = false;
        List<WorkEntity> workNotStarted = workDao.findNotStartedWork();

        for (WorkEntity work : workNotStarted) {
            if (work.getStartDate().equals(LocalDate.now()) || work.getStartDate().isBefore(LocalDate.now())) {
                work.setWorkStatus(WorkStatus.STARTED);
                workDao.save(work);
                success = true;
            }
        }
        if (success) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /**
     * Looks for work items within the next 30-day interval.
     *
     * @return Work items within the next 30-day interval
     */
    public List<WorkEntity> checkForUpcomingWork() {
        LocalDate today = LocalDate.now();
        today = today.plusDays(1); // "Kommande" innebär att man inte kollar på dagen utan det som kommer att komma
        //Lägger därför en dag framåt från dagens datum.
        LocalDate thirtyDaysForward = today.plusDays(30);

        return workDao.findFirstByStartDateBetween(today, thirtyDaysForward);
    }

    /**
     * Looks for started work items on the current date, if it's a weekend it instead looks at the friday.
     *
     * @return Found work-item.
     */
    public List<WorkEntity> checkForOngoingWork() {
        java.util.Calendar calendar = java.util.Calendar.getInstance();
        int dayOfWeek = calendar.get(java.util.Calendar.DAY_OF_WEEK);
        if (dayOfWeek == java.util.Calendar.SATURDAY) {
            return workDao.findWorkEntityForTodayIfSaturday(1);
        } else if (dayOfWeek == java.util.Calendar.SUNDAY) {
            return workDao.findWorkEntityForTodayIfSunday(1);
        } else {
            return workDao.findWorkEntityForToday(1);
        }
    }


    /**
     * Finds all work items related to the customer with the specified ID.
     *
     * @param id ID of customer.
     * @return List of all work items related to the customer
     */
    public List<WorkEntity> getAllWorkEntitiesByCustomerId(Long id) {
        return workDao.findAllByCustomerId(id);
    }
}