package com.example.constructionappapi.services.dataAccessLayer.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "calendar")
@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * A class creating and giving access to the table Calendar in DB
 */
public class CalendarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long workId;
    private LocalDate date;
}