package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.example.constructionappapi.services.dataAccessLayer.Status;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "work")
@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * A class creating and giving access to the table Work in DB
 */
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
    @JsonBackReference
    private CustomerEntity customer;
    @OneToMany(
            mappedBy = "work",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<CalendarEntity> calendar;
    @OneToMany(
            mappedBy = "workEntity",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<CustomerNoteEntity> customerNotes;

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

