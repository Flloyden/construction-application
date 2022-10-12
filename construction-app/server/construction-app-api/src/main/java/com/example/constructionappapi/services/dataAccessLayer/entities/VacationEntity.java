package com.example.constructionappapi.services.dataAccessLayer.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "vacation")
@Data
@AllArgsConstructor
@NoArgsConstructor

/**
 * A class creating and giving access to the table Vacation in DB
 */

public class VacationEntity {
    @Id
    private LocalDate vacationDate;
}
