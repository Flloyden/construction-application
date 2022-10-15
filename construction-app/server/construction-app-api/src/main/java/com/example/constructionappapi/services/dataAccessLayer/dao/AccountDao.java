package com.example.constructionappapi.services.dataAccessLayer.dao;


import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * A class that gives access to interaction with table Account in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
public interface AccountDao extends JpaRepository<AccountEntity, Long> {
}
