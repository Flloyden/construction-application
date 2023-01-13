package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


/**
 * A class that gives access to interaction with the table customer in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
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

    @Query(value = "SELECT customer.*, work.*, calendar.* " +
            "FROM customer " +
            "INNER JOIN work ON customer.id = work.customer_id " +
            "INNER JOIN calendar ON work.id = calendar.work_id " +
            "WHERE DATE(calendar.date) BETWEEN ?1 AND ?2",
            nativeQuery = true
    )
    List<CustomerEntity> findCustomersWithWorkAndCalendarBetweenStartDateAndEndDate(LocalDate startDate, LocalDate endDate);
}//long bcs Costumer id (primary key) is datatype long

