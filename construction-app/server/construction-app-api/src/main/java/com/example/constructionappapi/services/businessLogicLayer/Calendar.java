package com.example.constructionappapi.services.businessLogicLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;

public class Calendar {
    LocalDate[] vacationDays = new LocalDate[20];
    //ArrayList<WorkEntity> workItems = new ArrayList<>();
    public HashMap<CalendarEntity, WorkEntity> calendarDates = new HashMap<>();

    public Calendar addWork(WorkEntity work) {
        //workItems.add(work);

        int daysToAdd = work.getNumberOfDays();
        int daysToShuffleForward = daysToAdd;
        int startDate = work.getStartDate().getDayOfYear();

        for (int i = 0; i < daysToAdd; i++) {
            LocalDate date = LocalDate.of(work.getStartDate().getYear(), work.getStartDate().getMonth(), work.getStartDate().getDayOfMonth());
            //LocalDate.ofYearDay(LocalDate.now().getYear(), startDate + i);

            /*If the date where the new work is getting added already contains something the content that is already there needs
              to be shuffled forward x days decided by the daysToShuffleForward variable.*/
            if (calendarDates.get(date) != null) shuffleForward(startDate + i, daysToShuffleForward);
            else daysToShuffleForward--;/*If the spot where new work is being added is free all future work that needs to be
            shuffled forward should be shuffled forward one day less.*/

            //Add work to the specified date.
            //System.out.println(date);
            CalendarEntity calendarEntity = new CalendarEntity(date, work);
            work.getCalendar().add(calendarEntity);
            //System.out.println("boop");
            //System.out.println(calendarEntity.getDate());
            System.out.println(date);
            System.out.println(calendarDates.get(date));
            calendarDates.put(calendarEntity, work);
            //System.out.println("beep");
        }

        return this;
    }

    public void shuffleForward(int dayOfYear, int daysToShuffle) {

        LocalDate oldDate = LocalDate.ofYearDay(LocalDate.now().getYear(), dayOfYear);
        LocalDate newDate = LocalDate.ofYearDay(LocalDate.now().getYear(), dayOfYear + daysToShuffle);
        /*If the date where the work-object is trying to get shuffled to is already taken, the work-object
        that is already there should be shuffled forward one day.*/
        if (calendarDates.containsKey(newDate)) shuffleForward(dayOfYear + daysToShuffle, 1);

        /*If the date is free the work-object that is getting shuffled forward can be added. */
        WorkEntity workToAdd = calendarDates.get(oldDate);
        calendarDates.put(new CalendarEntity(newDate, workToAdd), workToAdd);
    }

    public void removeWork(WorkEntity work) {
        calendarDates.entrySet().removeIf(item -> item.getValue() == work);

        LocalDate[] lastDateMovedTo = {LocalDate.MIN};
        calendarDates.keySet().stream().sorted().forEach(calendarEntity -> {
            if (calendarEntity.getDate().isAfter(work.getStartDate())) {
                lastDateMovedTo[0] = moveCalendarItemBackwards(calendarDates.get(calendarEntity), calendarEntity, lastDateMovedTo[0]);
            }
        });

        System.out.println();
    }

    public LocalDate moveCalendarItemBackwards(WorkEntity workToMove, CalendarEntity calendarEntity, LocalDate lastDateMovedTo) {
        LocalDate dateToMoveTo = calendarEntity.getDate().minusDays(Long.parseLong("1"));
        LocalDate freeSpot = calendarEntity.getDate();

        //As long as
        while (true) {
            //Stop if we're past the last date that a work item was moved to.
            if (!dateToMoveTo.isAfter(lastDateMovedTo)) break;
            //Stop if start date of work being moved is reached.
            if (workToMove.getStartDate().isAfter(dateToMoveTo)) break;
            //Stop if the work being moved is the same as the one for which the date is being checked.
            if (calendarDates.get(dateToMoveTo) == workToMove) break;
            //Stop if reached today's date.
            if (LocalDate.now().isEqual(dateToMoveTo)) break;

            //System.out.println("oldDate: " + dateToMove);
            //System.out.println("newDate: " + dateToMoveTo);
            dateToMoveTo = dateToMoveTo.minusDays(1L);

            if (!calendarDates.containsKey(dateToMoveTo)) {
                if (dateToMoveTo.getDayOfWeek() != DayOfWeek.SATURDAY && dateToMoveTo.getDayOfWeek() != DayOfWeek.SUNDAY) {
                    freeSpot = dateToMoveTo;
                }
            }
        }
        dateToMoveTo = dateToMoveTo.plusDays(1L);
        //System.out.println(date + "->" + dateToMoveTo);

        if (!calendarDates.containsKey(freeSpot)) {
            calendarDates.put(new CalendarEntity(freeSpot, workToMove), workToMove);
            calendarDates.remove(calendarEntity);
            //System.out.println("boop" + dateToMoveTo);
            return freeSpot;
        }

        return lastDateMovedTo;
    }
}


