package com.example.constructionappapi.services.dataAccessLayer.entities;

import com.example.constructionappapi.services.dataAccessLayer.Status;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import lombok.*;

import javax.persistence.*;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.Base64;
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

    public void setCustomer(CustomerEntity customer) {
        this.customer = customer;
    }
}

