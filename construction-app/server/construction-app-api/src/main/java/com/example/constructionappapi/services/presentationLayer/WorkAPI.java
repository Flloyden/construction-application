package com.example.constructionappapi.services.presentationLayer;


import com.example.constructionappapi.services.businessLogicLayer.Calendar;
import com.example.constructionappapi.services.businessLogicLayer.CalendarSingleton;
import com.example.constructionappapi.services.businessLogicLayer.repositories.customer.ICustomerRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.work.IWorkRepository;
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
    private IWorkRepository iWorkRepository;
    @Autowired
    private ICustomerRepository iCustomerRepository;

    private Calendar calendar = CalendarSingleton.getCalendar();

    @PostMapping("/kunder/work/save")
    public CustomerEntity saveWork(@RequestBody CustomerEntity customer) {
        CustomerEntity customerEntity = iCustomerRepository.createCustomer(customer);
        calendar.addWork(iWorkRepository.getLastInserted());

        return customerEntity;
    }

    @PostMapping("/kunder/{customerId}/work/update")
    public WorkEntity updateWork(@PathVariable final Long customerId, @RequestBody WorkEntity work) {
        Optional<CustomerEntity> customer = iCustomerRepository.getCustomer(customerId);

        Optional<WorkEntity> preUpdateWork = iWorkRepository.getWorkEntity(work.getId());
        if (preUpdateWork.isPresent()) {
            if (!preUpdateWork.get().getStartDate().equals(work.getStartDate()) || preUpdateWork.get().getNumberOfDays() != work.getNumberOfDays()) {
                calendar.removeWork(preUpdateWork.get());
                calendar.addWork(work);
            }
        }

        if (customer.isPresent()) {
            work.setCustomer(customer.get());
            return iWorkRepository.createWorkEntity(work);
        }

        return iWorkRepository.getWorkEntity(work.getId()).get();
    }

    @PutMapping("/kunder/{customer_id}/work/edit/{id}")
    public WorkEntity editWorkEntity(@RequestBody WorkEntity work) {
        return iWorkRepository.editWorkEntity(work);
    }

    @GetMapping("/kunder/{customer_id}/work/{id}")
    public Optional<WorkEntity> getWorkEntity(@PathVariable final Long id) {
        return iWorkRepository.getWorkEntity(id);
    }

    @GetMapping("/kunder/work")
    public List<WorkEntity> getAllWorkEntities() {
        return iWorkRepository.getAllWorkEntities();

    }

    @DeleteMapping("/kunder/{customer_id}/work/delete/{id}")
    public void deleteWorkEntity(@PathVariable final Long id) {
        if (iWorkRepository.getWorkEntity(id).isPresent()) {
            WorkEntity work = iWorkRepository.getWorkEntity(id).get();
            calendar.removeWork(work);
        }
    }
}
