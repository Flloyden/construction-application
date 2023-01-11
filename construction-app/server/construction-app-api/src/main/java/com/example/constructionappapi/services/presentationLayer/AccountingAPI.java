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

    @PostMapping("/guarantees")
    public AccountingEntity createAccounting(@RequestBody AccountingEntity accountingEntity) {
        return accountingRepository.createAccounting(accountingEntity);
    }

    @GetMapping("/guarantees/{id}")
    public Optional<AccountingEntity> getAccounting(@PathVariable final Long id) {
        return accountingRepository.getAccounting(id);
    }

    @GetMapping("/guarantees/old-guarantees")
    public int getAmountOfOldAccounting() {
        return accountingRepository.getOldAccountings();
    }

    @GetMapping("guarantees/all-guarantees")
    public int getAmountOfAccounting() {
        return accountingRepository.getAllAccountingEntities().size();
    }

    @GetMapping("guarantees/active-guarantees")
    public int getAmountOfActiveAccounting() {
        return accountingRepository.getActiveAccountings();
    }

    @GetMapping("/guarantees")
    public List<AccountingEntity> getAllGuarentees() {
        return accountingRepository.getAllAccountingEntities();
    }

    @DeleteMapping("/guarantees/{id}/remove")
    public void deleteCustomer(@PathVariable final Long id) {
        accountingRepository.deleteAccounting(id);
    }
}
