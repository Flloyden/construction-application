package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.presentationLayer.bodies.UserInformation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AccountAPI {
    private final AccountRepository accountRepository;

    @PostMapping("/account")
    public AccountEntity createAccount(@RequestBody AccountEntity account) {
        return accountRepository.createAccount(account);
    }

    @GetMapping("/user/{accountId}")
    public ResponseEntity<UserInformation> getUser(@PathVariable final long accountId) {
        return accountRepository.findById(accountId)
                .map(accountEntity -> ResponseEntity
                        .ok()
                        .body(new UserInformation(
                                accountEntity.getId(),
                                accountEntity.getName(),
                                accountEntity.getEmail(),
                                accountEntity.getProfileImage(),
                                accountEntity.getRole()))).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/user/update")
    public void updateUserInfo(@RequestBody AccountEntity account) {
        accountRepository.updateUserInfo(account);
    }

    @GetMapping("/account/{id}")
    public Optional<AccountEntity> getAccount(@PathVariable final Long id) {
        return accountRepository.findById(id);
    }

    @GetMapping("/account")
    public List<AccountEntity> getAllAccounts() {
        return accountRepository.getAllAccountEntities();
    }

    @DeleteMapping("/account/{id}/remove")
    public void deleteAccount(@PathVariable final Long id) {
        accountRepository.deleteAccount(id);
    }
}
