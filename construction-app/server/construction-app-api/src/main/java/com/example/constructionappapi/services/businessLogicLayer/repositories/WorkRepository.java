package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.WorkDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;

import java.util.List;
import java.util.Optional;

public class WorkRepository implements IWorkRepository {

    private WorkDao workDao;

    public WorkRepository(WorkDao WorkDao) {
        this.workDao = WorkDao;
    }

    @Override
    public WorkEntity createWorkEntity(WorkEntity work) {
        return workDao.save(work);
    }

    @Override
    public List<WorkEntity> getAllWorkEntities() {
        return workDao.findAll();
    }

    @Override
    public Optional<WorkEntity> getWorkEntity(Long id) {
        return workDao.findById(id);
    }

    @Override
    public void deleteWorkEntity(Long id) {
        workDao.deleteById(id);
    }
}
