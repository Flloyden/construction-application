package com.example.constructionappapi.services.dataAccessLayer.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "accounting")
@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * A class creating the table accounting in DB. Also used for sending objects representing this DB table. Accountings representing guarantees/"accountings"/warranties
 */
public class AccountingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String registration_number;
    private String d_number;
    private LocalDate warranty_date;
    private long status;
    @Lob
    private String receipt;
}
