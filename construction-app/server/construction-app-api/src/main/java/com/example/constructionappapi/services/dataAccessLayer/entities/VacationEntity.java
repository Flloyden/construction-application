package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.example.constructionappapi.services.dataAccessLayer.CompletionStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vacation")
@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * A class creating the table vacation in DB. Also used for sending objects representing this DB table.
 */
public class VacationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private LocalDate startDate;
    private CompletionStatus completionStatus;
    private int numberOfDays;
    @OneToMany(
            mappedBy = "vacation",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference(value = "vacationToVacationCalendar")
    private List<VacationCalendarEntity> vacationCalendar = new ArrayList<>();
}
