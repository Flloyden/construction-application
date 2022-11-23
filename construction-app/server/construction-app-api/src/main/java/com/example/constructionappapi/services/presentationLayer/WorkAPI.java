package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CustomerRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.WorkRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CustomerEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.WorkEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class WorkAPI {

    @Autowired
    private WorkRepository workRepository;
    @Autowired
    private CustomerRepository customerRepository;

    private final Calendar calendar = CalendarSingleton.getCalendar();

    @PostMapping("/kunder/work/save")
    public CustomerEntity saveWork(@RequestBody CustomerEntity customer) {
         /* TODO: Probably a better way of saving work. With work as request body.
        Optional<CustomerEntity> customer = customerRepository.getCustomer(customerId);
        if (customer.isPresent()) {
            work.setCustomer(customer.get());
            calendar.addWork(work);
        }
         */

        CustomerEntity customerEntity = customerRepository.createCustomer(customer);
        calendar.addWork(workRepository.getLastInserted());

        return customerEntity;
    }

    @PostMapping("/kunder/{customerId}/work/update")
    public WorkEntity updateWork(@PathVariable final Long customerId, @RequestBody WorkEntity work) {
        Optional<CustomerEntity> customer = customerRepository.getCustomer(customerId);

        if (customer.isPresent()) {
            work.setCustomer(customer.get());
            //Get the pre-update work.
            Optional<WorkEntity> preUpdateWork = workRepository.getWorkEntity(work.getId());
            if (preUpdateWork.isPresent()) {
                WorkEntity updatedWork;
                //Check if date has been changed.
                if (!preUpdateWork.get().getStartDate().equals(work.getStartDate()) || preUpdateWork.get().getNumberOfDays() != work.getNumberOfDays()) {
                    updatedWork = calendar.updateWork(work);
                }
            }

            return workRepository.createWorkEntity(work);
        }

        return workRepository.getWorkEntity(work.getId()).get();
    }

    @PutMapping("/kunder/{customer_id}/work/edit/{id}")
    public WorkEntity editWorkEntity(@RequestBody WorkEntity work) {
        return workRepository.editWorkEntity(work);
    }

    @GetMapping("/kunder/{customer_id}/work/{id}")
    public Optional<WorkEntity> getWorkEntity(@PathVariable final Long id) {
        return workRepository.getWorkEntity(id);
    }

    @GetMapping("/kunder/work")
    public List<WorkEntity> getAllWorkEntities() {
        return workRepository.getAllWorkEntities();

    }

    @DeleteMapping("/kunder/{customer_id}/work/delete/{id}")
    public void deleteWorkEntity(@PathVariable final Long id) {
        if (workRepository.getWorkEntity(id).isPresent()) {
            WorkEntity work = workRepository.getWorkEntity(id).get();
            calendar.removeWork(work);
        }
    }
}
