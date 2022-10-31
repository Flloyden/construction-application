package com.example.constructionappapi.services.businessLogicLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.calendar.CalendarRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.work.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;

public class Calendar {
    private CalendarRepository calendarRepository;
    private WorkRepository workRepository;

    ArrayList<VacationEntity> vacationDays = new ArrayList<>();

    public HashMap<CalendarEntity, WorkEntity> calendarDates = new HashMap<>();

    /*
    public Calendar() {
        CustomerEntity customer = new CustomerEntity(7, "sgfdsgfdsgfd", "testAddressEdit", "54321", "testPropDesignation", "9999999", LocalDate.now(), new ArrayList<>(), new ArrayList<>());

        WorkEntity door = new WorkEntity(1, "Door", LocalDate.of(2023, 5, 22), 10, "testNote", null, Status.NOTSTARTED, customer, new ArrayList<>());
        WorkEntity fence = new WorkEntity(2, "Fence", LocalDate.of(2023, 5, 25), 10, "testNote", null, Status.NOTSTARTED, customer, new ArrayList<>());
        WorkEntity roof = new WorkEntity(3, "Roof", LocalDate.of(2023, 5, 29), 2, "testNote", null, Status.NOTSTARTED, customer, new ArrayList<>());

        addWork(fence);
        addWork(door);
        addWork(roof);

        System.out.println();
        System.out.println("Add");
        printCalendar();


        removeWork(door);
        System.out.println("Remove");
        printCalendar();

        removeWork(roof);
        System.out.println("Remove");
        printCalendar();

    }
*/

    /**
     * Retrieves calendar items from the database and populates the hash-map with them.
     */
    public void initializeCalendar() {
        calendarRepository.findAll().forEach(calendarEntity -> calendarDates.put(calendarEntity, calendarEntity.getWork()));
    }

    public boolean addWork(WorkEntity work) {
        //Check if the work item is already in the hashmap.
        for (WorkEntity workEntity : calendarDates.values()) {
            if (workEntity.getId() == work.getId()) return false;
        }

        int daysToAdd = work.getNumberOfDays();
        int daysToShuffleForward = daysToAdd;

        for (int i = 0; i < daysToAdd; i++) {
            LocalDate dateToAddTo = work.getStartDate().plusDays(i);
            CalendarEntity calendarEntity = new CalendarEntity(dateToAddTo, work);

            /*If the date where the new work is getting added already contains something the content that is already there needs
              to be shuffled forward x days decided by the daysToShuffleForward variable.*/
            if (calendarDates.get(new CalendarEntity(dateToAddTo)) != null)
                shuffleForward(dateToAddTo, daysToShuffleForward);
            else daysToShuffleForward--;/*If the spot where new work is being added is free all future work that needs to be
            shuffled forward should be shuffled forward one day less.*/

            //Add work to the specified date.
            calendarEntity = calendarRepository.save(calendarEntity);
            calendarEntity.getWork().getCalendar().add(calendarEntity); //Is this needed?
            calendarDates.put(calendarEntity, work);
        }

        return true;
    }

    public void shuffleForward(LocalDate date, int daysToShuffle) {
        LocalDate newDate = date.plusDays(daysToShuffle);
        CalendarEntity calendarEntity = calendarRepository.findFirstByDate(date); //id = 4

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
            //calendarRepository.save(new CalendarEntity(freeCalendarSpot, workToMove));
            calendarDates.remove(calendarEntity);
            calendarEntity.setDate(freeCalendarSpot);
            calendarDates.put(calendarEntity, calendarEntity.getWork());
            calendarRepository.save(calendarEntity);
            //calendarRepository.deleteCalendar(calendarEntity.getId());
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
        while (entrySet.hasNext()) {
            Map.Entry<CalendarEntity, WorkEntity> entry = entrySet.next();
            s.append("{");
            if (entry.getValue().getCustomer() != null) {
                s.append("\"title\":").append("\"").append(entry.getValue().getCustomer().getName()).append("\",");
            }
            s.append("\"date\":\"").append(entry.getKey().getDate()).append("\"");

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


