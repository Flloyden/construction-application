package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.example.constructionappapi.services.dataAccessLayer.WorkStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


/**
 * A class creating and giving access to the table Work in DB
 */
@Entity
@Table(name = "work")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkEntity implements Comparable<WorkEntity> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate earliestStartDate;
    private int numberOfDays;
    private boolean isLockedInCalendar;
    private String materialNote;
    @Lob
    private String offer;
    private WorkStatus workStatus;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference("customerToWork")
    private CustomerEntity customer;
    @OneToMany(
            mappedBy = "work",
            orphanRemoval = true)
    @JsonManagedReference(value = "workToCalendar")
    private List<CalendarEntity> calendar = new ArrayList<>();
    @OneToMany(
            mappedBy = "work",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference(value = "workToNote")
    private List<CustomerNoteEntity> customerNotes = new ArrayList<>();


    @OneToMany(
            mappedBy = "oneWork",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference(value = "workToSummary")
    private List<NoteSummaryEntity> noteSummaries = new ArrayList<>();

    public List<CustomerNoteEntity> getCustomerNotes() {
        return customerNotes;
    }

    public void setCustomer(CustomerEntity customer) {
        this.customer = customer;
    }

    public CustomerEntity getCustomer() {
        return customer;
    }

    public List<NoteSummaryEntity> getNoteSummaries() {
        return noteSummaries;
    }

    public void setSummary(NoteSummaryEntity noteSummary) {
        this.noteSummaries.add(noteSummary);
    }

    public WorkStatus getWorkStatus(){
        return workStatus;
    }

    public void setWorkStatus(WorkStatus workStatus) {
        this.workStatus = workStatus;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj.getClass() != WorkEntity.class) return false;

        WorkEntity workEntity = (WorkEntity) obj;
        return id.equals(workEntity.getId());
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public int compareTo(WorkEntity o) {
        return id.compareTo(o.getId());
    }

    public void update(WorkEntity newWorkEntity) {
        this.name = newWorkEntity.getName();
        this.startDate = newWorkEntity.getStartDate();
        this.earliestStartDate = newWorkEntity.earliestStartDate;
        this.numberOfDays = newWorkEntity.getNumberOfDays();
        this.isLockedInCalendar = newWorkEntity.isLockedInCalendar();
        this.materialNote = newWorkEntity.getMaterialNote();
        this.offer = newWorkEntity.offer;
        this.workStatus = newWorkEntity.workStatus;
        this.customer = newWorkEntity.getCustomer();
        this.calendar = newWorkEntity.getCalendar();
        this.customerNotes = newWorkEntity.getCustomerNotes();
        this.noteSummaries = newWorkEntity.getNoteSummaries();
    }
}

