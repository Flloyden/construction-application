package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

/**
 * A class that gives access to interaction with table Accounting in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface AccountingDao extends JpaRepository<AccountingEntity, Long> {


    @Modifying
    @Transactional
    @Query(
            value = "DELETE FROM accounting a WHERE DATE(a.warranty_date) <= :today",
            nativeQuery = true)
    int deleteOldAccountings(@Param("today") LocalDate today);

}
