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
public class AccountingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String registrationNumber;
    private LocalDate warrantyDate;
    @Lob
    private byte[] receipt;
}
