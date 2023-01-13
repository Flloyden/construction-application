package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.presentationLayer.bodies.UserInfoUpdateRequest;
import com.example.constructionappapi.services.presentationLayer.bodies.UserInformation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * API for account. This is where the client/front-end and server communication is made possible.
 */
@RestController
@RequestMapping("/api/v1")
public class AccountAPI {
    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/account")
    public AccountEntity createAccount(@RequestBody AccountEntity account) {
        return accountRepository.createAccount(account);
    }

    @PostMapping("/account/update")
    public ResponseEntity<String> updateUserInfo(@RequestBody UserInfoUpdateRequest userInfoUpdateRequest) {
        return accountRepository.updateUserInfo(userInfoUpdateRequest);
    }

    @GetMapping("/account/{accountId}")
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

    @GetMapping("/accounts")
    public List<AccountEntity> getAllAccounts() {
        return accountRepository.getAllAccountEntities();
    }

    @DeleteMapping("/account/{id}/remove")
    public void deleteAccount(@PathVariable final Long id) {
        accountRepository.deleteAccount(id);
    }
}
