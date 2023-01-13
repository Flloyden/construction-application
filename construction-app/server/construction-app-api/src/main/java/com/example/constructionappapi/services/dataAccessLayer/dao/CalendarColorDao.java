package com.example.constructionappapi.services.dataAccessLayer.dao;

import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarColorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * A class that gives access to interaction with the table calendarcolor in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
 */
public interface CalendarColorDao extends JpaRepository<CalendarColorEntity, Long> {

    List<CalendarColorEntity> findAllById(int i);
}
