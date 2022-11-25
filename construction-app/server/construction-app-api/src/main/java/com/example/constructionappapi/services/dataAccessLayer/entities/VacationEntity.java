package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


/**
 * A class creating and giving access to the table Vacation in DB
 */
@Entity
@Table(name = "vacation")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VacationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDate startDate;
    private int numberOfDays;
    @JsonManagedReference
    @OneToMany(
            mappedBy = "vacation",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<VacationCalendarEntity> vacationCalendar;
}
