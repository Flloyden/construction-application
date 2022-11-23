package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * A class that gives access to interaction with table Note in the DB (save, find, delete,
 * etc, given by JpaRepository) through it's entity-class
 */
@Repository
public interface CustomerNoteDao extends JpaRepository<CustomerNoteEntity, Long> {
    List<CustomerNoteEntity> findAllByCustomerId(Long customerId);
}
