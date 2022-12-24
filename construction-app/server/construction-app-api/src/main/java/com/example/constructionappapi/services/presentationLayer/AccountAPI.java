package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.presentationLayer.bodies.UserInformation;
import com.example.constructionappapi.services.security.JwtUtils;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AccountAPI {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final AccountRepository accountRepository;

    @PostMapping("/account")
    public AccountEntity createAccount(@RequestBody AccountEntity account) {
        return accountRepository.createAccount(account);
    }

    @GetMapping("/user")
    public String getUserInfo(@RequestBody AccountEntity account) {
        Optional<AccountEntity> accountEntity = accountRepository.findFirstByNameAndPassword(account.getUsername(), account.getPassword());
        System.out.println(account);
        StringBuilder s = new StringBuilder();

        if (accountEntity.isPresent()) {
            s.append("{");
            s.append("\"status\":").append("\"ok\"").append(",");
            s.append("\"message\":").append("\"Logged in\"").append(",");
            s.append("\"accessToken\":").append("\"").append(UUID.randomUUID()).append("\"").append(",");
            s.append("\"user\":").append("{");
            s.append("\"id\":").append(account.getId()).append(",");
            s.append("\"username\":").append("\"").append(account.getUsername()).append("\",");
            s.append("\"email\":").append("\"").append(account.getEmail()).append("\",");
            s.append("\"profileImage\":").append("\"").append(account.getProfileImage()).append("\"");
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

    @GetMapping("/user/{accountId}")
    public ResponseEntity<UserInformation> getUser(@PathVariable final long accountId) {
        return accountRepository.findById(accountId).map(accountEntity -> ResponseEntity
                        .ok()
                        .body(new UserInformation(
                                accountEntity.getId(),
                                accountEntity.getName(),
                                accountEntity.getEmail(),
                                accountEntity.getProfileImage(),
                                accountEntity.getRole())))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/user/update")
    public void updateUserInfo(@RequestBody AccountEntity account) {
        accountRepository.updateUserInfo(account);

        System.out.println(account);
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
