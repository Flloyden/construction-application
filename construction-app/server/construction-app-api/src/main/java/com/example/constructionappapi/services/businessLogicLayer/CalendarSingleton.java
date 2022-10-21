package com.example.constructionappapi.services.businessLogicLayer;

public class CalendarSingleton {
    private static Calendar calendar = null;

    private CalendarSingleton() {
    }

    public static Calendar getCalendar() {
        if (calendar == null) calendar = new Calendar();

        return calendar;
    }
}
