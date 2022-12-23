package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import javax.persistence.NamedQuery;
import java.util.List;
import java.util.Optional;

/**
 * A class that gives access to interaction with table Accounting in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface AccountingDao extends JpaRepository<AccountingEntity, Long> {


    @Modifying
    @Query("DELETE FROM accounting a WHERE a.warranty_date = CURRENT_DATE")
    int deleteOldAccountings();

}
