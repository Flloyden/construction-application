package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
@Entity
@Table(name = "vacationCalendar")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VacationCalendarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "vacation_id")
    @JsonBackReference
    private VacationEntity vacation;
}
