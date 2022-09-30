package com.example.constructionappapi.services.dataAccessLayer.entities;
import lombok.Data;
import javax.persistence.*;

@Entity
@Data
@Table(name = "kunder")

/**
 * A class representing (and creating?) the table User in DB
 */
public class CostumerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; //randomly generated id
    private String name;
}
