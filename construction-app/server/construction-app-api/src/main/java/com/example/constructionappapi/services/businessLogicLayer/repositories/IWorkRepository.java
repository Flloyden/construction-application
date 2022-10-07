package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;

import java.util.List;
import java.util.Optional;

public interface IWorkRepository {

    WorkEntity createWorkEntity(WorkEntity work);

    List<WorkEntity> getAllWorkEntities();

    Optional<WorkEntity> getWorkEntity(Long id);

    void deleteWorkEntity(Long id);

}
