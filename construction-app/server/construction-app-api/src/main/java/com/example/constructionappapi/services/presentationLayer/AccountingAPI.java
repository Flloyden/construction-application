package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.accounting.IAccountingRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class AccountingAPI {

    @Autowired
    private IAccountingRepository iAccountingRepository;

    @PostMapping("/bokföring")
    public AccountingEntity createAccounting(@RequestBody AccountingEntity accountingEntity) {
        return iAccountingRepository.createAccounting(accountingEntity);
    }

    @GetMapping("/bokföring/{id}")
    public Optional<AccountingEntity> getAccounting(@PathVariable final Long id) {
        return iAccountingRepository.getAccounting(id);
    }

    @GetMapping("/bokföring")
    public List<AccountingEntity> getAllCustomers() {
        return iAccountingRepository.getAllAccountingEntities();
    }

    @DeleteMapping("/bokföring/{id}/remove")
    public void deleteCustomer(@PathVariable final Long id) {
        iAccountingRepository.deleteAccounting(id);
    }
}
