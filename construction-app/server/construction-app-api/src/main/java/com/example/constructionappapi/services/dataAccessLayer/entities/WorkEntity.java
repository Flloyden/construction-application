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
public class WorkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private LocalDate startDate;
    private int numberOfDays;
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


    public List<CalendarEntity> getCalendarForWork() {
        return calendar;
    }
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

    public void setSummary(NoteSummaryEntity noteSummary){
        this.noteSummaries.add(noteSummary);
    }
}

