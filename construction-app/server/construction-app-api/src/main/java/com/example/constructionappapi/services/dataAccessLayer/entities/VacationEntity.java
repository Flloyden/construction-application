package com.example.constructionappapi.services.dataAccessLayer.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "vacation")
@Data
@AllArgsConstructor
@NoArgsConstructor

/**
 * A class creating and giving access to the table Vacation in DB
 */
public class VacationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private LocalDate startDate;
    private int numberOfDays;
    @OneToMany(
            mappedBy = "vacation",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<VacationCalendarEntity> vacationCalendar;
}
