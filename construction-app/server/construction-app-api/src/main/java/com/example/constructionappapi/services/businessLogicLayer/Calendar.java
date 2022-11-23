package com.example.constructionappapi.services.businessLogicLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;

public class Calendar {
    private CalendarRepository calendarRepository;
    private WorkRepository workRepository;
    private ArrayList<VacationEntity> vacationDays = new ArrayList<>();

    public HashMap<CalendarEntity, WorkEntity> calendarDates = new HashMap<>();

    /**
     * Retrieves calendar items from the database and populates the hash-map with them.
     */
    public void initializeCalendar() {
        calendarRepository.findAll().forEach(calendarEntity -> calendarDates.put(calendarEntity, calendarEntity.getWork()));
    }

    public boolean addWork(WorkEntity work) {
        //Check if the work item is already in the hashmap. TODO: Dunno if needed.
        for (WorkEntity workEntity : calendarDates.values()) {
            if (workEntity.getId() == work.getId()) return false;
        }

        int daysToAdd = work.getNumberOfDays();
        int daysToShuffleForward = daysToAdd;
        long n = 0L;
        for (int i = 0; i < daysToAdd; i++) {
            LocalDate dateToAddTo = work.getStartDate().plusDays(i + n);

            while (dateToAddTo.getDayOfWeek() == DayOfWeek.SATURDAY || dateToAddTo.getDayOfWeek() == DayOfWeek.SUNDAY) {
                dateToAddTo = dateToAddTo.plusDays(1);
                n++;
            }

            CalendarEntity calendarEntity = new CalendarEntity(dateToAddTo, work);

            /*If the date where the new work is getting added already contains something the content that is already there needs
              to be shuffled forward x days decided by the daysToShuffleForward variable.*/
            //if (calendarRepository.findFirstByDate(dateToAddTo) != null)
            if (calendarDates.get(new CalendarEntity(dateToAddTo)) != null) {
                shuffleForward(dateToAddTo, daysToShuffleForward);
            } else daysToShuffleForward--;/*If the spot where new work is being added is free all future work that needs to be
            shuffled forward should be shuffled forward one day less.*/

            //Add work to the specified date.
            calendarEntity = calendarRepository.save(calendarEntity);
            //calendarEntity.getWork().getCalendar().add(calendarEntity); //Is this needed?
            calendarDates.put(calendarEntity, work);
        }

        return true;
    }

    public void shuffleForward(LocalDate date, int daysToShuffle) {
        LocalDate newDate = date.plusDays(daysToShuffle);
        CalendarEntity calendarEntity = calendarRepository.findFirstByDate(date);

        while (newDate.getDayOfWeek() == DayOfWeek.SATURDAY || newDate.getDayOfWeek() == DayOfWeek.SUNDAY) {
            newDate = newDate.plusDays(1);
        }

        /*If the date where the work-object is trying to get shuffled to is already taken, the work-object
        that is already there should be shuffled forward one day.*/
        if (calendarDates.containsKey(new CalendarEntity(newDate))) shuffleForward(newDate, 1);

        /*If the date is free the work-object that is getting shuffled forward can be added. */
        calendarDates.remove(calendarEntity);
        calendarEntity.setDate(newDate);
        calendarEntity = calendarRepository.save(calendarEntity);
        calendarDates.put(calendarEntity, calendarEntity.getWork());
    }

    public void removeWork(WorkEntity work) {
        //Remove all map entries containing a work-object that has the same id as the specified work-object.
        workRepository.deleteWorkEntity(work.getId());
        calendarDates.entrySet().removeIf(item -> item.getValue().getId() == work.getId());

        //A work-item being moved back shouldn't be moved back past the date that the last work-item that was moved back were moved to.
        LocalDate[] lastDateMovedTo = {LocalDate.MIN};
        calendarDates.keySet().stream().sorted().forEach(calendarEntity -> {
            if (calendarEntity.getDate().isAfter(work.getStartDate())) {
                lastDateMovedTo[0] = moveCalendarItemBackwards(calendarDates.get(calendarEntity), calendarEntity, lastDateMovedTo[0]);
            }
        });
    }

    /**
     * Updates the dates for a work in the calendar by removing the old dates and then adding the new ones.
     * @param work The new work-entity.
     * @return The updated work-entity.
     */
    public WorkEntity updateWork(WorkEntity work) {
        String ANSI_RED = "\u001B[31m";
        WorkEntity updatedWork = workRepository.createWorkEntity(work);
        System.out.println(ANSI_RED + "Deleting old calendar posts." + ANSI_RED);
        calendarRepository.deleteAllByWorkId(updatedWork.getId());
        calendarDates.entrySet().removeIf(item -> item.getValue().getId() == updatedWork.getId());

        //A work-item being moved back shouldn't be moved back past the date that the last work-item that was moved back were moved to.
        LocalDate[] lastDateMovedTo = {LocalDate.MIN};
        calendarDates.keySet().stream().sorted().forEach(calendarEntity -> {
            if (calendarEntity.getDate().isAfter(work.getStartDate())) {
                lastDateMovedTo[0] = moveCalendarItemBackwards(calendarDates.get(calendarEntity), calendarEntity, lastDateMovedTo[0]);
            }
        });

        System.out.println(ANSI_RED + "Adding new calendar posts." + ANSI_RED);
        addWork(updatedWork);

        return workRepository.getWorkEntity(updatedWork.getId()).get();
    }

    public LocalDate moveCalendarItemBackwards(WorkEntity workToMove, CalendarEntity calendarEntity, LocalDate lastDateMovedTo) {
        LocalDate possibleDate = calendarEntity.getDate().minusDays(1L);
        LocalDate freeCalendarSpot = null;

        while (true) {
            //Stop if we reached the last date that a work item was moved to.
            if (!possibleDate.isAfter(lastDateMovedTo)) break;
            //Stop if the start date of the work-item being moved is reached.
            if (workToMove.getStartDate().isAfter(possibleDate)) break;
            //Stop if the work-item being moved is the same as the one for which the date is being checked.
            if (calendarDates.get(new CalendarEntity(possibleDate)) == workToMove) break;
            //Stop if reached today's date.
            if (LocalDate.now().isEqual(possibleDate)) break;

            //Set freeCalenderSpot to possibleDate if the spot in the calendar is free, and it's not on a weekend.
            if (!calendarDates.containsKey(new CalendarEntity(possibleDate))) {
                if (possibleDate.getDayOfWeek() != DayOfWeek.SATURDAY && possibleDate.getDayOfWeek() != DayOfWeek.SUNDAY) {
                    boolean vacationCheck = true;
                    for (VacationEntity vacationEntity : vacationDays) {
                        if (vacationEntity.getVacationDate().equals(possibleDate)) {
                            vacationCheck = false;
                            break;
                        }
                    }

                    if (vacationCheck) {
                        freeCalendarSpot = possibleDate;
                    }
                }
            }

            possibleDate = possibleDate.minusDays(1L);
        }

        if (freeCalendarSpot != null && !calendarDates.containsKey(new CalendarEntity(freeCalendarSpot))) {
            calendarDates.remove(calendarEntity);
            calendarEntity.setDate(freeCalendarSpot);
            calendarDates.put(calendarEntity, calendarEntity.getWork());
            calendarRepository.save(calendarEntity);
            return freeCalendarSpot;
        }

        return lastDateMovedTo;
    }

    public void printCalendar() {
        calendarDates.keySet().stream().sorted(Comparator.reverseOrder()).forEach(key -> {
            WorkEntity work = calendarDates.get(key);
            String s = String.format("Key: %s %s %-10s %s | Value: %-5s %s %s %s", key.getId(), key.getDate(), key.getDate().getDayOfWeek(), key.hashCode(), work.getName(), work.getId(), work.getStartDate(), work.getNumberOfDays());
            System.out.println(s);
        });

        System.out.println();
    }

    @Override
    public String toString() {
        StringBuilder s = new StringBuilder();
        Iterator<Map.Entry<CalendarEntity, WorkEntity>> entrySet = calendarDates.entrySet().iterator();

        s.append("[");

        for (VacationEntity vacationEntity : vacationDays) {
            s.append("{");
            s.append("\"title\":").append("\"").append("Semester").append("\",");
            s.append("\"date\":\"").append(vacationEntity.getVacationDate()).append("\",");
            s.append("\"color\":\"").append("#25C900").append("\"");
            s.append("},");
        }
        while (entrySet.hasNext()) {
            Map.Entry<CalendarEntity, WorkEntity> entry = entrySet.next();
            s.append("{");
            if (entry.getValue().getCustomer() != null) {
                s.append("\"customerName\":").append("\"").append(entry.getValue().getCustomer().getName()).append("\",");
            }
            s.append("\"workName\":\"").append(entry.getValue().getName()).append("\",");
            s.append("\"date\":\"").append(entry.getKey().getDate()).append("\",");
            s.append("\"color\":\"").append("#FF0000").append("\",");
            s.append("\"customerId\":\"").append(entry.getValue().getCustomer().getId()).append("\"");
            s.append("}");
            if (entrySet.hasNext()) s.append(",");
        }

        s.append("]");

        return s.toString();
    }

    public void setCalendarRepository(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    public void setWorkRepository(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }
}


