package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountingRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/v1")
public class AccountingAPI {

    @Autowired
    private AccountingRepository accountingRepository;

    @PostMapping("/bokföring")
    public AccountingEntity createAccounting(@RequestBody AccountingEntity accountingEntity) {
        return accountingRepository.createAccounting(accountingEntity);
    }

    @GetMapping("/bokföring/{id}")
    public Optional<AccountingEntity> getAccounting(@PathVariable final Long id) {
        return accountingRepository.getAccounting(id);
    }

    @GetMapping("/bokföring")
    public List<AccountingEntity> getAllCustomers() {
        return accountingRepository.getAllAccountingEntities();
    }

    @DeleteMapping("/bokföring/{id}/remove")
    public void deleteCustomer(@PathVariable final Long id) {
        accountingRepository.deleteAccounting(id);
    }
}
