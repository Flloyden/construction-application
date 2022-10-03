package com.example.constructionappapi.services.dataAccessLayer;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * A class that gives access to interaction with table Customer in the DB (save, find, delete, etc)
 * through it's entity-class
 */
public interface DBAccessCustomer extends JpaRepository<CustomerEntity, Long> { }//long bcs Costumer id is datatype long

