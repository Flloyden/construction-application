package com.example.constructionappapi.services.presentationLayer.bodies;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VacationCalendarInformation {
    private long vacationId;
    private String vacationName;
    private LocalDate date;
    private LocalDate startDate;
    private int numberOfDays;
}
