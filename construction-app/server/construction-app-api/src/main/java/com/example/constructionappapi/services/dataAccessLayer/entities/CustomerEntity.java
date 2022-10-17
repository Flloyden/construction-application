package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity //to generate Costumer table
@Table(name = "customer")
@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * A class creating and giving access to the table Customer in DB
 */
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; //automatically incrementing id
    private String name;
    private String address;
    private String phoneNumber;
    private String propertyDesignation;
    private String socialSecurityNumber;
    private LocalDate creationDate = LocalDate.now();  //TODO: Need to check so that value doesn't get overwritten when saving a customer.
    @JsonManagedReference
    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<WorkEntity> workList;
    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<CustomerNoteEntity> customerNotes;

    public List<CustomerNoteEntity> getCustomerNotes() {
        return customerNotes;
    }

    public List<WorkEntity> getWorkList() {
        return workList;
    }
}
