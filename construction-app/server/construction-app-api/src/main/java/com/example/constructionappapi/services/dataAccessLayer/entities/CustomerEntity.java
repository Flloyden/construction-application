package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity //to generate Costumer table
@Table(name = "customer")
@Data
@NamedNativeQuery(name = "Customer.findActiveCustomerByDate", query = "SELECT customer.name, customer.address \n" +
        "FROM construction_system.customer\n" +
        "INNER JOIN construction_system.work \n" +
        "ON customer.id = work.customer_id\n" +
        "WHERE work.start_date = \"?1\";", resultClass = CustomerEntity.class)
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
    private String mail;
    private String phoneNumber;
    private String city;
    private String zip;
    private String propertyDesignation;
    private String socialSecurityNumber;
    private LocalDate creationDate = LocalDate.now();  //TODO: Need to check so that value doesn't get overwritten when saving a customer.
    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference("customerToWork")
    private List<WorkEntity> workList = new ArrayList<>();
    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference("customerToNote")
    private List<CustomerNoteEntity> customerNotes = new ArrayList<>();

    @OneToMany(
            mappedBy = "customer",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonManagedReference(value = "customerToSummary")
    private List<NoteSummaryEntity> noteSummaries = new ArrayList<>();

    public List<CustomerNoteEntity> getCustomerNotes() {
        return customerNotes;
    }

    public List<WorkEntity> getWorkList() {
        return workList;
    }

    public CustomerEntity getCustomerObject(long customerId){
        return this;
    }
}
