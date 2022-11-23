package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Class accessing the customer table in DB
 */
@Service
public class CustomerRepository {

    @Autowired
    private CustomerDao customerDao;

    /**
     * Adds the CustomerEntity-object to the WorkEntity-/CustomerNoteEntity-objects, to set foreign-key in the tables,
     * and then creates/saves the CustomerEntity along with the WorkEntities/CustomerNoteEntities contained in the lists.
     *
     * @param customer
     * @return
     */

    public CustomerEntity createCustomer(CustomerEntity customer) {
        List<WorkEntity> workList;
        if ((workList = customer.getWorkList()) != null) { //Kollar om listan är tom
            for (WorkEntity work : workList) {
                work.setCustomer(customer);//om inte tom -> assign work till en customer.

                List<CalendarEntity> calendarList;
                if ((calendarList = work.getCalendar()) != null) {
                    for (CalendarEntity calendarEntity : calendarList) {
                        calendarEntity.setWork(work);
                    }
                }
            }
        }

        List<CustomerNoteEntity> customerNotes;
        if ((customerNotes = customer.getCustomerNotes()) != null) { // Kollar om listan är tom
            for (CustomerNoteEntity customerNoteEntity : customerNotes) {
                customerNoteEntity.setCustomerForNote(customer); //om inte tom -> assignar customernotes till customer
            }
        }

        return customerDao.save(customer);
    }

    public List<CustomerEntity> getAllCustomers() {
        return customerDao.findAll();
    } //Returns all customers


    public Optional<CustomerEntity> getCustomer(Long id) {
        return customerDao.findById(id); //Returns customer by ID
    }


    public void deleteCustomer(Long id) {
        customerDao.deleteById(id); //Deletes customer by ID
    }
}