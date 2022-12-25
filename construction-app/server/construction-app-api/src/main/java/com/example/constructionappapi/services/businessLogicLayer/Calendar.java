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

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

public class Calendar {
    private CalendarRepository calendarRepository;
    private VacationRepository vacationRepository;
    private WorkRepository workRepository;

    private HashMap<CalendarEntity, Long> calendarDates = new HashMap<>();
    private HashMap<Long, WorkEntity> workMap = new HashMap<>();
    private HashMap<VacationCalendarEntity, VacationEntity> vacationDates = new HashMap<>();


    /**
     * Retrieves calendar items from the database and populates the hash-map with them.
     */
    public void initializeCalendar() {
        calendarRepository.findAll().forEach(calendarEntity -> {
            calendarDates.put(calendarEntity, calendarEntity.getWork().getId());
            workMap.put(calendarEntity.getWork().getId(), calendarEntity.getWork());
        });
        vacationRepository.findAllVacationCalendarEntities().forEach(vacationCalendarEntity -> vacationDates.put(vacationCalendarEntity, vacationCalendarEntity.getVacation()));
    }

    public void addWork(WorkEntity work) {
        //Check if the work item is already in the hashmap. TODO: Dunno if needed.
        if (workMap.containsKey(work.getId())) return;
        workMap.put(work.getId(), work);
        addDaysToCalendar(work.getNumberOfDays(), work.getStartDate(), work);
        workRepository.updateStartingDates();
    }

    private void addDaysToCalendar(int numberOfDaysToAdd, LocalDate startDate, WorkEntity work) {
        int daysToShuffleForward = numberOfDaysToAdd;
        long n = 0L;
        for (int i = 0; i < numberOfDaysToAdd; i++) {
            LocalDate dateToAddTo = startDate.plusDays(i + n);

            while (true) {
                if (!isWeekend(dateToAddTo)) {
                    break;
                }
                if (!vacationDates.containsKey(new VacationCalendarEntity(dateToAddTo))) {
                    break;
                }
                if (calendarDates.containsKey(new CalendarEntity(dateToAddTo)) && !workMap.get(calendarDates.get(new CalendarEntity(dateToAddTo))).isLockedInCalendar()) {
                    break;
                }

                dateToAddTo = dateToAddTo.plusDays(1);
                n++;
            }

            /*
            while (dateToAddTo.getDayOfWeek() == DayOfWeek.SATURDAY || dateToAddTo.getDayOfWeek() == DayOfWeek.SUNDAY || vacationDates.containsKey(new VacationCalendarEntity(dateToAddTo))) {
                dateToAddTo = dateToAddTo.plusDays(1);
                n++;
            }
             */

            CalendarEntity calendarEntity = new CalendarEntity(dateToAddTo, work);

            /*If the date where the new work is getting added already contains something the content that is already there needs
              to be shuffled forward x days decided by the daysToShuffleForward variable.*/
            //if (calendarRepository.findFirstByDate(dateToAddTo) != null)
            if (calendarDates.get(new CalendarEntity(dateToAddTo)) != null) {
                shuffleForward(dateToAddTo, daysToShuffleForward);
            } else {/*If the spot where new work is being added is free all future work that needs to be
            shuffled forward should be shuffled forward one day less.*/
                daysToShuffleForward--;
            }

            //Add work to the specified date.
            calendarEntity = calendarRepository.save(calendarEntity);
            //calendarEntity.getWork().getCalendar().add(calendarEntity); //Is this needed?
            calendarDates.put(calendarEntity, work.getId());
        }
    }

    /**
     * Updates the dates for a work in the calendar by removing the old dates and then adding the new ones.
     *
     * @param work The new work-entity.
     */
    public void updateStartDate(WorkEntity work) {
        calendarRepository.deleteAllByWorkId(work.getId());
        calendarDates.entrySet().removeIf(item -> item.getValue().equals(work.getId()));
        workMap.remove(work.getId());

        moveCalendarItemBackwards(work.getStartDate());

        addWork(work);
    }

    public void increaseNumberOfDays(WorkEntity work, int numberOfDays) {
        Optional<CalendarEntity> calendarEntity = calendarRepository.findFirstByWorkIdByOrderByDateDesc(work.getId());
        calendarEntity.ifPresent(entity -> addDaysToCalendar(numberOfDays, calendarEntity.get().getDate().plusDays(1), work));
    }

    public void reduceNumberOfDays(WorkEntity work, int numberOfDays) {
        for (int i = 0; i < numberOfDays; i++) {
            Optional<CalendarEntity> calendarEntityToRemove = calendarRepository.deleteLastByWorkId(work.getId());
            calendarEntityToRemove.ifPresent(entity -> calendarDates.remove(calendarEntityToRemove.get()));
        }

        moveCalendarItemBackwards(work.getStartDate());
    }

    public void removeWork(WorkEntity work) {
        workMap.remove(work.getId());
        calendarDates.entrySet().removeIf(item -> item.getValue().equals(work.getId()));
        moveCalendarItemBackwards(work.getStartDate());
    }

    public void addVacation(VacationEntity vacation, List<VacationCalendarEntity> vacationDatesToAdd) {
        int daysToAdd = vacation.getNumberOfDays();
        int daysToShuffleForward = daysToAdd;

        long n = 0L;
        for (int i = 0; i < daysToAdd; i++) {
            LocalDate dateToAddTo = vacation.getStartDate().plusDays(i);

            if (calendarDates.get(new CalendarEntity(dateToAddTo)) != null) {
                shuffleForward(dateToAddTo, daysToShuffleForward);
            } else {
                daysToShuffleForward--;
            }

            vacationDates.put(vacationDatesToAdd.get(i), vacation);
        }

        workRepository.updateStartingDates();
    }

    public void removeVacation(VacationEntity vacation) {
        vacationDates.entrySet().removeIf(item -> item.getValue().getId() == vacation.getId());
        moveCalendarItemBackwards(vacation.getStartDate());
        workRepository.updateStartingDates();
    }

    public void shuffleForward(LocalDate date, int daysToShuffle) {
        LocalDate newDate = date.plusDays(daysToShuffle);
        CalendarEntity calendarEntity = calendarRepository.findFirstByDate(date);

        while (true) {
            if (!isWeekend(newDate)) break;
            if (!vacationDates.containsKey(new VacationCalendarEntity(newDate))) break;
            if (calendarDates.containsKey(new CalendarEntity(newDate)) && !workMap.get(calendarDates.get(new CalendarEntity(newDate))).isLockedInCalendar())
                break;

            newDate = newDate.plusDays(1);
        }

        /*If the date where the work-object is trying to get shuffled to is already taken, the work-object
        that is already there should be shuffled forward one day.*/
        if (calendarDates.containsKey(new CalendarEntity(newDate))) shuffleForward(newDate, 1);

        /*If the date is free the work-object that is getting shuffled forward can be added. */
        calendarDates.remove(calendarEntity);
        calendarEntity.setDate(newDate);
        calendarEntity = calendarRepository.save(calendarEntity);
        calendarDates.put(calendarEntity, calendarEntity.getWork().getId());
    }

    public void moveCalendarItemBackwards(LocalDate startDate) {
        //A work-item being moved back shouldn't be moved back past the date that the last work-item that was moved back were moved to.
        LocalDate[] lastDateMovedTo = {LocalDate.MIN};
        calendarDates.keySet().stream().sorted().forEach(calendarEntity -> {
            if (calendarEntity.getDate().isAfter(startDate)) {
                lastDateMovedTo[0] = moveCalendarItemBackwards(workMap.get(calendarDates.get(calendarEntity)), calendarEntity, lastDateMovedTo[0]);
            }
        });
    }

    public LocalDate moveCalendarItemBackwards(WorkEntity workToMove, CalendarEntity calendarEntity, LocalDate lastDateMovedTo) {
        LocalDate possibleDate = calendarEntity.getDate().minusDays(1L);
        LocalDate freeCalendarSpot = null;

        while (true) {
            //Stop if we reached the last date that a work item was moved to.
            if (!possibleDate.isAfter(lastDateMovedTo)) break;
            //Stop if the start date of the work-item being moved is reached.
            if (workToMove.getEarliestStartDate().isAfter(possibleDate)) break;
            //Stop if the work-item being moved is the same as the one for which the date is being checked.
            if (workToMove.getId().equals(calendarDates.get(new CalendarEntity(possibleDate)))) break;
            //Stop if reached today's date.
            if (LocalDate.now().isEqual(possibleDate)) break;

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

        if (freeCalendarSpot != null && !calendarDates.containsKey(new CalendarEntity(freeCalendarSpot))) {
            calendarDates.remove(calendarEntity);
            calendarEntity.setDate(freeCalendarSpot);
            calendarDates.put(calendarEntity, calendarEntity.getWork().getId());
            calendarRepository.save(calendarEntity);
            return freeCalendarSpot;
        }

        return lastDateMovedTo;
    }

    private boolean isWeekend(LocalDate date) {
        return date.getDayOfWeek() == DayOfWeek.SATURDAY || date.getDayOfWeek() == DayOfWeek.SUNDAY;
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

    public List<WorkCalendarInformation> getWorkCalendarInformation() {
        return calendarDates.entrySet().stream().map(entry -> new WorkCalendarInformation(
                workMap.get(entry.getValue()).getCustomer().getId(),
                workMap.get(entry.getValue()).getCustomer().getName(),
                workMap.get(entry.getValue()).getName(),
                entry.getKey().getDate()
        )).collect(Collectors.toList());
    }

    public List<VacationCalendarInformation> getVacationCalendarInformation() {
        return vacationDates.entrySet().stream().map(entry -> new VacationCalendarInformation(
                entry.getValue().getId(),
                entry.getValue().getName(),
                entry.getKey().getDate(),
                entry.getValue().getStartDate(),
                entry.getValue().getNumberOfDays()
        )).collect(Collectors.toList());
    }

    public void setCalendarRepository(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    public void setWorkRepository(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }

    public void setVacationRepository(VacationRepository vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    public HashMap<CalendarEntity, Long> getCalendarHashMap() {
        return calendarDates;
    }

    public HashMap<Long, WorkEntity> getWorkMap() {
        return workMap;
    }
}


