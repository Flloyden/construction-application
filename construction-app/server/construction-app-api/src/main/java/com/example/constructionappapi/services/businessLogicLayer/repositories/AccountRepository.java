package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.AccountDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.presentationLayer.bodies.UserInfoUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountRepository {
    @Autowired
    private AccountDao accountDao;

    public Optional<AccountEntity> findFirstByNameAndPassword(String username, String password) {
        return accountDao.findFirstByNameAndPassword(username, password);
    }

    public AccountEntity createAccount(AccountEntity account) {
        return accountDao.save(account);
    }

    public List<AccountEntity> getAllAccountEntities() {
        return accountDao.findAll();
    }

    public Optional<AccountEntity> findById(Long id) {
        return accountDao.findById(id);
    }

    public void deleteAccount(Long id) {
        accountDao.deleteById(id);
    }

    public ResponseEntity<String> updateUserInfo(UserInfoUpdateRequest userInfoUpdateRequest) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        final Optional<AccountEntity> accountEntity = Optional.ofNullable(findByEmail(userInfoUpdateRequest.getEmail()));
        if (accountEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found.");
        }

        if (!bCryptPasswordEncoder.matches(userInfoUpdateRequest.getPassword(), accountEntity.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found.");
        }

        accountEntity.ifPresent(entity -> {
            entity.setName(userInfoUpdateRequest.getName());
            entity.setEmail(userInfoUpdateRequest.getEmail());
            entity.setProfileImage(userInfoUpdateRequest.getProfileImage());
            entity.setRole(userInfoUpdateRequest.getUserRole());

            accountDao.save(entity);
        });

        return ResponseEntity.ok().body("User information successfully changed.");
    }

    public AccountEntity findByEmail(String email) {
        return accountDao.findFirstByEmail(email);
    }

    public void save(AccountEntity user) {
        accountDao.save(user);
    }

    public Optional<AccountEntity> findByRecoveryToken(String token) {
        return accountDao.findFirstByRecoveryToken(token);
    }

    public Optional<AccountEntity> findByEmailAndRefreshToken(String email, String refreshToken) {
        return accountDao.findFirstByEmailAndRefreshToken(email, refreshToken);
    }

    public Optional<AccountEntity> findByRefreshToken(String refreshToken) {
        return accountDao.findFirstByRefreshToken(refreshToken);
    }

    public ResponseEntity changePassword(String email, String oldPassword, String newPassword, String newPasswordConfirmation) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        final Optional<AccountEntity> accountEntity = Optional.ofNullable(findByEmail(email));
        if (accountEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found.");
        }

        if (!bCryptPasswordEncoder.matches(oldPassword, accountEntity.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found.");
        }

        if (!newPassword.equals(newPasswordConfirmation)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("New passwords doesn't match.");
        }

        accountEntity.get().setPassword(new BCryptPasswordEncoder().encode(newPassword));
        accountDao.save(accountEntity.get());

        return ResponseEntity.ok().body("Password successfully changed.");
    }

    public ResponseEntity checkPasswordForAccountChange(String email, String password, AccountEntity account) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        final Optional<AccountEntity> accountEntity = accountDao.findById(account.getId());
        if (accountEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found.");
        }

        if (!bCryptPasswordEncoder.matches(password, accountEntity.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Password does not match.");
        }
        if (!account.getEmail().matches(email)) {
            accountEntity.get().setEmail(email);
        }

        accountDao.save(accountEntity.get());

        return ResponseEntity.ok().body("Password matched.");
    }
}
