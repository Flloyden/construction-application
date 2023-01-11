package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.example.constructionappapi.services.dataAccessLayer.WorkStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
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
    private long id;
    private String name;
    private LocalDate startDate;
    private WorkStatus workStatus;
    private int numberOfDays;
    @OneToMany(
            mappedBy = "vacation",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference(value = "vacationToVacationCalendar")
    private List<VacationCalendarEntity> vacationCalendar = new ArrayList<>();
}
