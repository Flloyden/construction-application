package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "customer_note")
@Data
@AllArgsConstructor
@NoArgsConstructor

/**
 * A class creating and giving access to the table Note in DB
 */

public class CustomerNoteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate datePosted;
    private String note;
    private String timeSpend;
    private String kmDriven;
    private String timeEmployee;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    private CustomerEntity customer;
    @ManyToOne
    @JoinColumn(name = "work_id")
    @JsonIgnore
    private WorkEntity workEntity;

    public void setCustomer(CustomerEntity customer) {
    }


}
