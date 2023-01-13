package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.WorkStatus;
import com.example.constructionappapi.services.dataAccessLayer.dao.CustomerDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerNoteEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * This class is the middle-man between the Presentation Layer and the Data Access Layer.
 */
@Service
public class CustomerRepository {

    @Autowired
    private CustomerDao customerDao;
    @Autowired
    private WorkRepository workRepository;

    /**
     * Adds the CustomerEntity-object to the WorkEntity-/CustomerNoteEntity-objects, to set foreign-key in the tables,
     * and then creates/saves the CustomerEntity along with the WorkEntities/CustomerNoteEntities contained in the lists.
     *
     * @param customer
     * @return
     */
    public ResponseEntity<CustomerEntity> createCustomer(CustomerEntity customer) {
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

        return ResponseEntity.status(HttpStatus.CREATED).body(customerDao.save(customer));
    }

    public ResponseEntity<List<CustomerEntity>> getAllCustomers() {
        return ResponseEntity.ok().body(customerDao.findAll());
    }

    /**
     * Looks for a customer in the database based on their ID.
     *
     * @param id ID of the user.
     * @return 200 and CustomerEntity of the customer if found, 404 if otherwise.
     */
    public ResponseEntity<?> getCustomer(Long id) {
        Optional<CustomerEntity> customer = customerDao.findById(id);
        if (customer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kunden kunde inte hittas");
        }

        return ResponseEntity.ok().body(customer.get());
    }

    /**
     * Deletes a customer from the database.
     *
     * @param id ID of the customer to delete.
     * @return Status confirming of denying the success of the deletion.
     */
    public ResponseEntity<String> deleteCustomer(Long id) {
        if (!customerDao.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kunden kunde inte hittas");
        }

        List<WorkEntity> workEntities = workRepository.getAllWorkEntitiesByCustomerId(id);
        if (workEntities != null && !workEntities.isEmpty()) {
            for (WorkEntity workEntity : workEntities) {
                if (workEntity.getWorkStatus() != WorkStatus.NOTSTARTED) {
                    return ResponseEntity
                            .status(HttpStatus.FORBIDDEN)
                            .body("Kunden kunde inte tas bort då den innehåller ett eller flera påbörjade eller avklarade jobb");
                }
            }

            for (WorkEntity workEntity : workEntities) {
                workRepository.deleteWorkEntity(workEntity.getId());
            }
        }

        customerDao.deleteById(id); //Deletes customer by ID

        return ResponseEntity.ok().body("Kund borttagen");
    }

    public List<CustomerEntity> getOngoingWorkTest() {
        return customerDao.findCustomersWithWorkAndCalendarForToday();
    }

    public List<CustomerEntity> getUpcomingWorkTest() {
        LocalDate tomorrow = LocalDate.now();
        tomorrow = tomorrow.plusDays(1);
        LocalDate tenDaysForward = tomorrow.plusDays(10);
        return customerDao.findCustomersWithWorkAndCalendarBetweenStartDateAndEndDate(tomorrow, tenDaysForward);
    }
}