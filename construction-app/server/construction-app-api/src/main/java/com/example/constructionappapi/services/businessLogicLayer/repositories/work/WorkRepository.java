package com.example.constructionappapi.services.businessLogicLayer.repositories.work;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.businessLogicLayer.repositories.work.IWorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.dao.WorkDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkRepository implements IWorkRepository {

    @Autowired
    private WorkDao workDao;
    private Calendar calendar = CalendarSingleton.getCalendar();

    /**
     * Creates a Work "Instance" and saves it in our DB using a WorkEntity as param
     *
     * @param work
     * @return
     */
    @Override
    public WorkEntity createWorkEntity(WorkEntity work) {
        return workDao.save(work);
    }

    /**
     * Edits an existing Work "Instance" if the ID already exists in the DB, otherwise it will function as createWorkEntity()
     *
     * @param work
     * @return
     */
    @Override
    public WorkEntity editWorkEntity(WorkEntity work) {
        return workDao.save(work);
    }

    /**
     * Returns all WorkEntities
     *
     * @return
     */
    @Override
    public List<WorkEntity> getAllWorkEntities() {
        return workDao.findAll();
    }

    /**
     * Returns specific WorkEntity using ID
     *
     * @param id
     * @return
     */
    @Override
    public Optional<WorkEntity> getWorkEntity(Long id) {
        return workDao.findById(id);
    }

    /**
     * Deletes specific WorkEntity using ID
     *
     * @param id
     */
    @Override
    public void deleteWorkEntity(Long id) {
        workDao.deleteById(id);
    }
}
