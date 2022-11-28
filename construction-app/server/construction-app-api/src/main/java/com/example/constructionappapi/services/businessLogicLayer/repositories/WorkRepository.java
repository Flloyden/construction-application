package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerDao;
import com.example.constructionappapi.services.dataAccessLayer.dao.WorkDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkRepository {

    @Autowired
    private WorkDao workDao;
    @Autowired
    private CustomerDao customerDao;
    private Calendar calendar = CalendarSingleton.getCalendar();

    public WorkRepository() {
        calendar.setWorkRepository(this);
    }

    /**
     * Creates a Work "Instance" and saves it in our DB using a WorkEntity as param
     *
     * @param work
     * @return
     */

    public WorkEntity createWorkEntity(WorkEntity work) {
        return workDao.save(work);
    }

    /**
     * Edits an existing Work "Instance" if the ID already exists in the DB, otherwise it will function as createWorkEntity()
     *
     * @param work
     * @return
     */

    public WorkEntity editWorkEntity(WorkEntity work) {
        return workDao.save(work);
    }

    /**
     * Returns all WorkEntities
     *
     * @return
     */

    public List<WorkEntity> getAllWorkEntities() {
        return workDao.findAll();
    }

    /**
     * Returns specific WorkEntity using ID
     *
     * @param id
     * @return
     */

    public Optional<WorkEntity> getWorkEntity(Long id) {
        return workDao.findById(id);
    }

    /**
     * Deletes specific WorkEntity using ID
     *
     * @param id
     */

    public void deleteWorkEntity(Long id) {
        Optional<WorkEntity> work = getWorkEntity(id);
        if (work.isPresent()) {
            workDao.delete(work.get());
            calendar.removeWork(work.get());
        }
    }


    public WorkEntity getLastInserted() {
        return workDao.findFirstByOrderByIdDesc();
    }

    public WorkEntity updateWork(long customerId, WorkEntity work) {
        Optional<CustomerEntity> customer = customerDao.findById(customerId);
        if (customer.isPresent()) {
            work.setCustomer(customer.get());

            Optional<WorkEntity> preUpdateWork = workDao.findById(work.getId());
            if (preUpdateWork.isPresent()) {
                WorkEntity updatedWork = null;
                //Checks if the date has been changed and updates the calendar if it has.
                if (!preUpdateWork.get().getStartDate().equals(work.getStartDate()) || preUpdateWork.get().getNumberOfDays() != work.getNumberOfDays()) {
                    updatedWork = calendar.updateWork(work);
                }

                return updatedWork;
            }
        }

        return null;
    }
}
