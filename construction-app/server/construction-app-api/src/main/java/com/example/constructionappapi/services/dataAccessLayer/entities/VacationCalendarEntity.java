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
/**
 * A class creating the table vacation_calendar in DB. Also used for sending objects representing this DB table.
 */
public class VacationCalendarEntity implements Comparable<VacationCalendarEntity> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "vacation_id")
    @JsonBackReference(value = "vacationToVacationCalendar")
    private VacationEntity vacation;

    public VacationCalendarEntity(LocalDate date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj.getClass() != VacationCalendarEntity.class) return false;

        VacationCalendarEntity vacationCalendarEntity = (VacationCalendarEntity) obj;
        return date.equals(vacationCalendarEntity.getDate());
    }

    @Override
    public int hashCode() {
        return date.hashCode();
    }

    @Override
    public int compareTo(VacationCalendarEntity o) {
        return date.compareTo(o.date);
    }
}
