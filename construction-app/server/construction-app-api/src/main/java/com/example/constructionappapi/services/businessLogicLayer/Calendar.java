package com.example.constructionappapi.services.businessLogicLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.VacationRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationCalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.VacationEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;

public class Calendar {
    private CalendarRepository calendarRepository;
    private VacationRepository vacationRepository;
    private WorkRepository workRepository;
    private ArrayList<VacationEntity> vacationDays = new ArrayList<>();

    public HashMap<CalendarEntity, WorkEntity> calendarDates = new HashMap<>();
    public HashMap<VacationCalendarEntity, VacationEntity> vacationDates = new HashMap<>();

    /**
     * Retrieves calendar items from the database and populates the hash-map with them.
     */
    public void initializeCalendar() {
        calendarRepository.findAll().forEach(calendarEntity -> calendarDates.put(calendarEntity, calendarEntity.getWork()));
        vacationRepository.findAllVacationCalendarEntities().forEach(vacationCalendarEntity -> vacationDates.put(vacationCalendarEntity, vacationCalendarEntity.getVacation()));
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

            while (dateToAddTo.getDayOfWeek() == DayOfWeek.SATURDAY || dateToAddTo.getDayOfWeek() == DayOfWeek.SUNDAY || vacationDates.containsKey(new VacationCalendarEntity(dateToAddTo))) {
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

    /**
     * Updates the dates for a work in the calendar by removing the old dates and then adding the new ones.
     *
     * @param work The new work-entity.
     * @return The updated work-entity.
     */
    public boolean updateWork(WorkEntity work) {
        //WorkEntity updatedWork = workRepository.createWorkEntity(work);
        calendarRepository.deleteAllByWorkId(work.getId());
        calendarDates.entrySet().removeIf(item -> item.getValue().getId() == work.getId());

        moveCalendarItemBackwards(work.getStartDate());


        //workRepository.getWorkEntity(updatedWork.getId()).get();
        return addWork(work);
    }

    public void removeWork(WorkEntity work) {
        calendarDates.entrySet().removeIf(item -> item.getValue().getId() == work.getId());
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
    }

    public void removeVacation(VacationEntity vacation) {
        vacationDates.entrySet().removeIf(item -> item.getValue().getId() == vacation.getId());
        moveCalendarItemBackwards(vacation.getStartDate());
    }

    public void shuffleForward(LocalDate date, int daysToShuffle) {
        LocalDate newDate = date.plusDays(daysToShuffle);
        CalendarEntity calendarEntity = calendarRepository.findFirstByDate(date);

        while (newDate.getDayOfWeek() == DayOfWeek.SATURDAY || newDate.getDayOfWeek() == DayOfWeek.SUNDAY || vacationDates.containsKey(new VacationCalendarEntity(newDate))) {
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

    public void moveCalendarItemBackwards(LocalDate startDate) {
        //A work-item being moved back shouldn't be moved back past the date that the last work-item that was moved back were moved to.
        LocalDate[] lastDateMovedTo = {LocalDate.MIN};
        calendarDates.keySet().stream().sorted().forEach(calendarEntity -> {
            if (calendarEntity.getDate().isAfter(startDate)) {
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

    public void printVacationCalendar() {
        vacationDates.keySet().stream().sorted(Comparator.reverseOrder()).forEach(key -> {
            VacationEntity vacation = vacationDates.get(key);
            String s = String.format("Key: %s %s %-10s %s | Value: %-5s %s %s %s", key.getId(), key.getDate(), key.getDate().getDayOfWeek(), key.hashCode(), vacation.getName(), vacation.getId(), vacation.getStartDate(), vacation.getNumberOfDays());
            System.out.println(s);
        });

        System.out.println();
    }


    public String workToString() {
        StringBuilder s = new StringBuilder();
        Iterator<Map.Entry<CalendarEntity, WorkEntity>> entrySetWork = calendarDates.entrySet().iterator();

        s.append("[");

        while (entrySetWork.hasNext()) {
            Map.Entry<CalendarEntity, WorkEntity> entry = entrySetWork.next();
            s.append("{");
            if (entry.getValue().getCustomer() != null) {
                s.append("\"customerName\":").append("\"").append(entry.getValue().getCustomer().getName()).append("\",");
            }
            s.append("\"workName\":\"").append(entry.getValue().getName()).append("\",");
            s.append("\"date\":\"").append(entry.getKey().getDate()).append("\",");
            s.append("\"color\":\"").append("#FF0000").append("\",");
            s.append("\"customerId\":\"").append(entry.getValue().getCustomer().getId()).append("\"");
            s.append("}");
            if (entrySetWork.hasNext()) s.append(",");
        }


        s.append("]");

        return s.toString();
    }

    public String vacationToString() {
        StringBuilder s = new StringBuilder();
        Iterator<Map.Entry<VacationCalendarEntity, VacationEntity>> entrySetVacation = vacationDates.entrySet().iterator();

        s.append("[");

        while (entrySetVacation.hasNext()) {
            Map.Entry<VacationCalendarEntity, VacationEntity> entry = entrySetVacation.next();
            s.append("{");
            s.append("\"vacationId\":").append("\"").append(entry.getValue().getId()).append("\",");
            s.append("\"vacationName\":").append("\"").append(entry.getValue().getName()).append("\",");
            s.append("\"date\":").append("\"").append(entry.getKey().getDate()).append("\"");
            s.append("}");
            if (entrySetVacation.hasNext()) s.append(",");
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

    public void setVacationRepository(VacationRepository vacationRepository) {
        this.vacationRepository = vacationRepository;
    }
}


