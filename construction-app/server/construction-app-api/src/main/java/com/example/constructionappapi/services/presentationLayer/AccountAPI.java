package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.account.IAccountRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class AccountAPI {

    @Autowired
    private IAccountRepository iAccountRepository;

    @PostMapping("/account")
    public AccountEntity createAccount(@RequestBody AccountEntity account) {
        return iAccountRepository.createAccount(account);
    }

    @PostMapping("/login")
    public String login(@RequestBody AccountEntity account) {
        Optional<AccountEntity> accountEntity = iAccountRepository.findFirstByUsernameAndPassword(account.getUsername(), account.getPassword());
        System.out.println(account);
        StringBuilder s = new StringBuilder();

        if(accountEntity.isPresent()) {
            s.append("{");
            s.append("\"status\":").append("\"ok\"").append(",");
            s.append("\"message\":").append("\"Logged in\"").append(",");
            s.append("\"accessToken\":").append("\"").append(UUID.randomUUID()).append("\"").append(",");
            s.append("\"user\":").append("{");
            s.append("\"id\":").append(account.getId()).append(",");
            s.append("\"username\":").append("\"").append(account.getUsername()).append("\"");
            s.append("}");
            s.append("}");
        } else {
            s.append("{");
            s.append("\"status\":").append("\"error\"").append(",");
            s.append("\"message\":").append("\"Felaktig inloggning\"");
            s.append("}");
        }

        return s.toString();
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
