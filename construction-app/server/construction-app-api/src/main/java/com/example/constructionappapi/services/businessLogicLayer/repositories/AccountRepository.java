package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.AccountDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
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
            entity.setName(account.getUsername());
            entity.setEmail(account.getEmail());
            entity.setProfileImage(account.getProfileImage());
            accountDao.save(entity);
        });
    }

    public AccountEntity findUserByEmail(String email) {
        return accountDao.findFirstByEmail(email);
    }
}
