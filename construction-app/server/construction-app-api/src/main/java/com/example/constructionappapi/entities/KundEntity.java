package com.example.constructionappapi.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "kunder")
public class KundEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
}
