package com.example.constructionappapi.services.dataAccessLayer.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "customer_registry")
@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * A class representing (and creating?) the table User in DB
 */
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; //automatically incrementing id
    private String name;
}
