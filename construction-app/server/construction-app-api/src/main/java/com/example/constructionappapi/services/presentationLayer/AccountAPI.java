package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.account.IAccountRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class AccountAPI {

    private IAccountRepository iAccountRepository;

    @PostMapping("/account")
    public AccountEntity createAccount(@RequestBody AccountEntity account) {
        return iAccountRepository.createAccount(account);
    }

    @GetMapping("/account/{id}")
    public Optional<AccountEntity> getAccount(@PathVariable final Long id) {
        return iAccountRepository.getAccount(id);
    }

    @GetMapping("/account")
    public List<AccountEntity> getAllAccounts() {
        return iAccountRepository.getAllAccountEntities();
    }

    @DeleteMapping("/account/{id}/remove")
    public void deleteAccount(@PathVariable final Long id) {
        iAccountRepository.deleteAccount(id);
    }
}
