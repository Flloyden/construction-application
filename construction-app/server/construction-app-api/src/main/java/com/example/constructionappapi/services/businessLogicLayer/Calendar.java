package com.example.constructionappapi.services.businessLogicLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.VacationRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationCalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import com.example.constructionappapi.services.presentationLayer.bodies.VacationCalendarInformation;
import com.example.constructionappapi.services.presentationLayer.bodies.WorkCalendarInformation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

public class Calendar {
    private CalendarRepository calendarRepository;
    private VacationRepository vacationRepository;
    private WorkRepository workRepository;
    private final HashMap<CalendarEntity, Long> calendarDates = new HashMap<>();
    private final HashMap<Long, WorkEntity> workMap = new HashMap<>();
    private final HashMap<VacationCalendarEntity, VacationEntity> vacationDates = new HashMap<>();

    public void setCalendarRepository(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    public void setWorkRepository(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }

    public void setVacationRepository(VacationRepository vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    public HashMap<CalendarEntity, Long> getCalendarMap() {
        return calendarDates;
    }

    public HashMap<Long, WorkEntity> getWorkMap() {
        return workMap;
    }

    public HashMap<VacationCalendarEntity, VacationEntity> getVacationMap() {
        return vacationDates;
    }

    /**
     * Initializes the hash-maps used for the calendar with values from the database.
     */
    public void initializeCalendar() {
        calendarRepository.findAll().forEach(calendarEntity -> {
            calendarDates.put(calendarEntity, calendarEntity.getWork().getId());
            workMap.put(calendarEntity.getWork().getId(), calendarEntity.getWork());
        });
        vacationRepository.findAllVacationCalendarEntities().forEach(vacationCalendarEntity -> vacationDates.put(vacationCalendarEntity, vacationCalendarEntity.getVacation()));
    }

    /**
     * Add days of the new work to the calendar.
     *
     * @param work Work being added to the calendar.
     * @return
     */
    public ResponseEntity<WorkEntity> addWork(WorkEntity work) {
        if (workMap.containsKey(work.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        workMap.put(work.getId(), work);
        addDaysToCalendar(work.getNumberOfDays(), work.getStartDate(), work);
        moveCalendarItemBackwards(LocalDate.now());

        return ResponseEntity.status(HttpStatus.CREATED).body(work);
    }

    /**
     * Adds work days to the calendar.
     *
     * @param numberOfDaysToAdd Hom many days to add.
     * @param startDate         Date to start adding days from.
     * @param work              Work being added to the calendar.
     */
    private void addDaysToCalendar(int numberOfDaysToAdd, LocalDate startDate, WorkEntity work) {
        int daysToShuffleForward = calcDaysToShuffleForward(work);
        long daysSkipped = 0L;
        for (int i = 0; i < numberOfDaysToAdd; i++) {
            LocalDate dateToAddTo = startDate.plusDays(i + daysSkipped);

            while (isWeekend(dateToAddTo) || vacationDates.containsKey(new VacationCalendarEntity(dateToAddTo)) || isDateTakenByLockedWork(dateToAddTo)) {
                dateToAddTo = dateToAddTo.plusDays(1);
                daysSkipped++;
            }

            CalendarEntity calendarEntity = new CalendarEntity(dateToAddTo, work);

            /*If the date where the new work is getting added already contains something the content that is already there needs
              to be shuffled forward x days decided by the daysToShuffleForward variable.*/
            if (calendarDates.get(new CalendarEntity(dateToAddTo)) != null) {
                shuffleForward(dateToAddTo, daysToShuffleForward);
            } else {
                /*If the spot where new work is being added is free all future work that needs to be
                 shuffled forward should be shuffled forward one day less.*/
                daysToShuffleForward--;
            }

            calendarEntity = calendarRepository.save(calendarEntity);
            calendarDates.put(calendarEntity, work.getId());
        }
    }

    /**
     * Calculates how far an existing calendar-item needs to be shuffled forward to make place for
     * the new work.
     *
     * @param work The new work.
     * @return Number of days to shuffle forward.
     */
    private int calcDaysToShuffleForward(WorkEntity work) {
        int numberOfDaysToAdd = work.getNumberOfDays();
        int numberOfDaysToSkip = 0;
        LocalDate startDate = work.getStartDate();

        for (int i = 0; i < numberOfDaysToAdd; i++) {
            LocalDate date = startDate.plusDays(i + numberOfDaysToSkip);

            while (isWeekend(date) || vacationDates.containsKey(new VacationCalendarEntity(date)) || isDateTakenByLockedWork(date)) {
                date = date.plusDays(1);
                numberOfDaysToSkip++;
            }
        }

        return numberOfDaysToAdd + numberOfDaysToSkip;
    }

    /**
     * Changes the start date for a work in the calendar by removing the old dates and then adding the new ones.
     *
     * @param work The new work.
     */
    public void changeStartDateOfWorkOnCalendar(LocalDate oldStartDate, WorkEntity work) {
        calendarRepository.deleteAllByWorkId(work.getId());
        calendarDates.entrySet().removeIf(item -> item.getValue().equals(work.getId()));
        workMap.remove(work.getId());

        moveCalendarItemBackwards(oldStartDate);

        addWork(work);
    }

    /**
     * Increase the number of days of the work on the calendar.
     *
     * @param work              Work to increase the number of days of.
     * @param numberOfDaysToAdd Number of days to increase the work by.
     */
    public void increaseNumberOfDaysOfWork(WorkEntity work, int numberOfDaysToAdd) {
        calendarRepository
                .findFirstByWorkIdByOrderByDateDesc(work.getId())
                .ifPresent(calendarEntity -> addDaysToCalendar(numberOfDaysToAdd, calendarEntity.getDate().plusDays(1), work));
    }

    /**
     * Reduce the number of days of the work on the calendar.
     *
     * @param work                 Work to reduce the number of days of.
     * @param numberOfDaysToRemove Number of days to reduce the work by.
     */
    public void reduceNumberOfDaysOfWork(WorkEntity work, int numberOfDaysToRemove) {
        for (int i = 0; i < numberOfDaysToRemove; i++) {
            calendarRepository.deleteLastByWorkId(work.getId()).ifPresent(calendarDates::remove);
        }

        moveCalendarItemBackwards(work.getStartDate());
    }

    /**
     * Remove work from the calendar.
     *
     * @param work Work to remove.
     */
    public void removeWork(WorkEntity work) {
        workMap.remove(work.getId());
        calendarDates.entrySet().removeIf(item -> item.getValue().equals(work.getId()));
        moveCalendarItemBackwards(work.getStartDate());
    }

    /**
     * Add the vacation to the calendar.
     *
     * @param vacation           Vacation to add.
     * @param vacationDatesToAdd Vacation-dates to add.
     */
    public void addVacation(VacationEntity vacation, List<VacationCalendarEntity> vacationDatesToAdd) {
        int daysToAdd = vacation.getNumberOfDays();

        for (int i = 0; i < daysToAdd; i++) {
            LocalDate dateToAddTo = vacation.getStartDate().plusDays(i);

            if (calendarDates.get(new CalendarEntity(dateToAddTo)) != null) {
                shuffleForward(dateToAddTo, 1);
            }

            vacationDates.put(vacationDatesToAdd.get(i), vacation);
        }

        workRepository.updateStartingDates();
    }

    /**
     * Remove the vacation from the calendar.
     *
     * @param vacation Vacation to remove.
     */
    public void removeVacation(VacationEntity vacation) {
        vacationDates.entrySet().removeIf(item -> item.getValue().getId() == vacation.getId());
        moveCalendarItemBackwards(vacation.getStartDate());
        workRepository.updateStartingDates();
    }

    /**
     * Shuffle existing calendar-item forwards on the calendar.
     *
     * @param date          Date of calendar-item to shuffle forward.
     * @param daysToShuffle Number of days to shuffle the calendar-item forwards.
     */
    public void shuffleForward(LocalDate date, int daysToShuffle) {
        LocalDate newDate = date.plusDays(daysToShuffle);
        CalendarEntity calendarEntity = calendarRepository.findFirstByDate(date);

        while (isWeekend(newDate) || vacationDates.containsKey(new VacationCalendarEntity(newDate)) || isDateTakenByLockedWork(newDate)) {
            newDate = newDate.plusDays(1);
        }

        /*If the date where the work-object is trying to get shuffled to is already taken, the work-object
        that is already there should be shuffled forward one day.*/
        if (calendarDates.containsKey(new CalendarEntity(newDate))) {
            shuffleForward(newDate, 1);
        }

        /*If the date is free the work-object that is getting shuffled forward can be added. */
        calendarDates.remove(calendarEntity);
        calendarEntity.setDate(newDate);
        calendarEntity = calendarRepository.save(calendarEntity);
        calendarDates.put(calendarEntity, calendarEntity.getWork().getId());
    }

    /**
     * Moves all work related calendar items after startDate backwards on the calendar.
     *
     * @param startDate The date to start looking forwards on the calendar from.
     */
    public void moveCalendarItemBackwards(LocalDate startDate) {
        //A work-item being moved back shouldn't be moved back past the date that the last work-item that was moved back were moved to.
        LocalDate[] lastDateMovedTo = {LocalDate.MIN};
        calendarDates.keySet().stream().sorted().forEach(calendarEntity -> {
            if (calendarEntity.getDate().isAfter(startDate)) {
                WorkEntity workToMove = workMap.get(calendarDates.get(calendarEntity));

                if (!workToMove.isLockedInCalendar()) {
                    lastDateMovedTo[0] = moveCalendarItemBackwards(workToMove, calendarEntity, lastDateMovedTo[0]);
                }
            }
        });
    }

    /**
     * Moves all calendar items backwards on the calendar.
     *
     * @param workToMove      The work currently being moved.
     * @param calendarEntity  CalendarEntity related to the work being moved.
     * @param lastDateMovedTo The last date that something was moved to.
     * @return The date that the calendar item was moved to.
     */
    public LocalDate moveCalendarItemBackwards(WorkEntity workToMove, CalendarEntity calendarEntity, LocalDate lastDateMovedTo) {
        LocalDate possibleDate = calendarEntity.getDate().minusDays(1L);
        LocalDate freeCalendarSpot = findFreeCalendarSpot(possibleDate, lastDateMovedTo, workToMove);

        if (freeCalendarSpot != null && !calendarDates.containsKey(new CalendarEntity(freeCalendarSpot))) {
            calendarDates.remove(calendarEntity);
            calendarEntity.setDate(freeCalendarSpot);
            calendarDates.put(calendarEntity, calendarEntity.getWork().getId());
            calendarRepository.save(calendarEntity);
            return freeCalendarSpot;
        }

        return lastDateMovedTo;
    }

    /**
     * Finds the earliest free calendar spot that the work can be added to.
     *
     * @param possibleDate    Date to start from.
     * @param lastDateMovedTo The last date that something was added to.
     * @param workToMove      The work being moved.
     * @return The date that the work was moved to, or null if no free calendar spot was found for the work
     * being moved
     */
    private LocalDate findFreeCalendarSpot(LocalDate possibleDate, LocalDate lastDateMovedTo, WorkEntity workToMove) {
        LocalDate freeCalendarSpot = null;

        while (true) {
            if (!possibleDate.isAfter(lastDateMovedTo)) {
                break; //Stop if we reached the last date that a work item was moved to.
            }
            if (workToMove.getEarliestStartDate() != null && possibleDate.isBefore(workToMove.getEarliestStartDate())) {
                break; //Stop if the start date of the work-item being moved is reached.
            }
            if (workToMove.getId().equals(calendarDates.get(new CalendarEntity(possibleDate)))) {
                break; //Stop if the work-item being moved is the same as the one for which the date is being checked.
            }
            if (possibleDate.isBefore(LocalDate.now())) {
                break; //Stop if reached today's date.
            }

            //Set freeCalenderSpot to possibleDate if the spot in the calendar is free, and it's not on a weekend.
            if (!calendarDates.containsKey(new CalendarEntity(possibleDate))) {
                if (!vacationDates.containsKey(new VacationCalendarEntity(possibleDate))) {
                    if (possibleDate.getDayOfWeek() != DayOfWeek.SATURDAY && possibleDate.getDayOfWeek() != DayOfWeek.SUNDAY) {
                        freeCalendarSpot = possibleDate;
                    }
                }
            }

            possibleDate = possibleDate.minusDays(1L);
        }

        return freeCalendarSpot;
    }

    /**
     * Checks if a date is a weekend.
     *
     * @param date The date.
     * @return true if weekend, otherwise false.
     */
    private boolean isWeekend(LocalDate date) {
        return date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY;
    }

    /**
     * Checks if a date is taken by a locked work.
     *
     * @param dateToAddTo The date.
     * @return true if taken by locked work, false otherwise.
     */
    private boolean isDateTakenByLockedWork(LocalDate dateToAddTo) {
        return calendarDates.containsKey(new CalendarEntity(dateToAddTo)) && workMap.get(calendarDates.get(new CalendarEntity(dateToAddTo))).isLockedInCalendar();
    }

    /**
     * Gets calendar related information about vacations for the front-end.
     *
     * @return Information about vacations.
     */
    public List<WorkCalendarInformation> getWorkCalendarInformation() {
        return calendarDates.entrySet().stream().map(entry -> new WorkCalendarInformation(
                workMap.get(entry.getValue()).getCustomer().getId(),
                workMap.get(entry.getValue()).getCustomer().getName(),
                workMap.get(entry.getValue()).getName(),
                workMap.get(entry.getValue()).isLockedInCalendar(),
                entry.getKey().getDate()
        )).collect(Collectors.toList());
    }

    /**
     * Gets calendar related information about work for the front-end.
     *
     * @return Information about work.
     */
    public List<VacationCalendarInformation> getVacationCalendarInformation() {
        return vacationDates.entrySet().stream().map(entry -> new VacationCalendarInformation(
                entry.getValue().getId(),
                entry.getValue().getName(),
                entry.getKey().getDate(),
                entry.getValue().getStartDate(),
                entry.getValue().getNumberOfDays()
        )).collect(Collectors.toList());
    }

    public void printCalendar() {
        calendarDates.keySet().stream().sorted(Comparator.reverseOrder()).forEach(key -> {
            WorkEntity work = workMap.get(calendarDates.get(key));
            String s = String.format("Key: %s %s %-10s %s | Value: %-5s %s %s %s", key.getId(), key.getDate(), key.getDate().getDayOfWeek(), key.hashCode(), work.getName(), work.getId(), work.getStartDate(), work.getNumberOfDays());
            System.out.println(s);
        });

        System.out.println();
    }

    public void printWorkMap() {
        workMap.keySet().stream().sorted(Comparator.reverseOrder()).forEach(key -> {
            WorkEntity work = workMap.get(key);
            String s = String.format("Key: %s | Value: %-5s %s %s %s", key, key.hashCode(), work.getName(), work.getId(), work.getStartDate(), work.getNumberOfDays());
            System.out.println(s);
        });

        System.out.println();
    }

    public void printVacationCalendar() {
        vacationDates.keySet().stream().sorted(Comparator.reverseOrder()).forEach(key -> {
            VacationEntity vacation = vacationDates.get(key);
            String s = String.format("Key: %s %s %-10s %s | Value: %-5s %s %s %s", key.getId(), key.getDate(), key.getDate().getDayOfWeek(), key.hashCode(), vacation.getName(), vacation.getId(), vacation.getStartDate(), vacation.getNumberOfDays());
            System.out.println(s);
        });

        System.out.println();
    }
}


