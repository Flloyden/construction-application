package com.example.constructionappapi.services.dataAccessLayer.entities;

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
public class CustomerNoteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate datePosted;
    private String note;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer;
}
