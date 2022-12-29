package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.AccountDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
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

    public void updateUserInfo(AccountEntity account) {
        Optional<AccountEntity> accountEntity = accountDao.findById(account.getId());

        accountEntity.ifPresent(entity -> {
            entity.setName(account.getName());
            entity.setEmail(account.getEmail());
            entity.setProfileImage(account.getProfileImage());

            System.out.println("updateUserInfo username: " + account.getName());
            System.out.println("updateUserInfo email: " + account.getEmail());
            accountDao.save(entity);
        });
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
        final Optional<AccountEntity> accountEntity = accountDao.findFirstByEmailAndPassword(email, new BCryptPasswordEncoder().encode(oldPassword));
        if (accountEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found.");
        }

        if (newPassword.equals(newPasswordConfirmation)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("New passwords doesn't match.");
        }

        accountEntity.get().setPassword(new BCryptPasswordEncoder().encode(newPassword));
        accountDao.save(accountEntity.get());

        return ResponseEntity.ok().body("Password successfully changed.");
    }
}
