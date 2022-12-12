package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * A class that gives access to interaction with table Customer in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface CustomerDao extends JpaRepository<CustomerEntity, Long> {


    @Query(value = "SELECT customer.*, work.*, calendar.* " +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) = CURRENT_DATE",
            nativeQuery = true
    )
    List<CustomerEntity> findCustomersWithWorkAndCalendarForToday();
}//long bcs Costumer id (primary key) is datatype long

