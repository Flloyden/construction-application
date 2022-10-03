package com.example.constructionappapi.services.dataAccessLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
/**
 * A class that gives access to interaction with table Customer in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
public interface DBAccessCustomer extends JpaRepository<CustomerEntity, Long> { }//long bcs Costumer id (primary key) is datatype long

