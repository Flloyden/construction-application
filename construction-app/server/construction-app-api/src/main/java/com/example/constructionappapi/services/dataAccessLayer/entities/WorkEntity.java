package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.example.constructionappapi.services.dataAccessLayer.Status;
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
    private Status workStatus;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference("customerToWork")
    private CustomerEntity customer;
    @OneToMany(
            mappedBy = "work",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference(value = "workToCalendar")
    private List<CalendarEntity> calendar;
    @OneToMany(
            mappedBy = "workEntity",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference(value = "workToNote")
    private List<CustomerNoteEntity> customerNotes = new ArrayList<>(); //TODO: Might cause problems.

    public List<CustomerNoteEntity> getCustomerNotes() {
        return customerNotes;
    }

    public void setCustomer(CustomerEntity customer) {
        this.customer = customer;
    }

    public CustomerEntity getCustomer() {
        return customer;
    }
}

