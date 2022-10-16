package com.example.constructionappapi.services.dataAccessLayer.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "account")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String loginName;
    private String password;
    private String email;
    private LocalDate timeOfLastLogin;
    private int failedLoginCounter;
}