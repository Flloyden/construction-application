package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedQuery;
import java.util.Optional;

/**
 * A class that gives access to interaction with table Accounting in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface AccountingDao extends JpaRepository<AccountingEntity, Long> {

}
