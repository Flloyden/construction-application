package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class CalendarEntity implements Comparable<CalendarEntity> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "work_id")
    @JsonBackReference(value = "workToCalendar")
    private WorkEntity work;

    public CalendarEntity(LocalDate date) {
        this.date = date;
    }

    public CalendarEntity(LocalDate date, WorkEntity work) {
        this.date = date;
        this.work = work;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj.getClass() != CalendarEntity.class) return false;

        CalendarEntity calendarEntity = (CalendarEntity) obj;
        return date.equals(calendarEntity.getDate());
    }

    @Override
    public int hashCode() {
        return date.hashCode();
    }

    @Override
    public int compareTo(CalendarEntity o) {
        return date.compareTo(o.date);
    }

    public WorkEntity getWork(){
        return work;
    }

    public LocalDate getDate() {
        return date;
    }
}
