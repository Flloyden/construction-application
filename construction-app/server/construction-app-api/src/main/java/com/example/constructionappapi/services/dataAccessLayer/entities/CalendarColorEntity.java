package com.example.constructionappapi.services.dataAccessLayer.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "calendarcolor")
@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * A class creating the table calendarcolor in DB. Also used for sending objects representing this DB table.
 */
public class CalendarColorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    String workColor;
    String vacationColor;
    String weekendsColor;
}
