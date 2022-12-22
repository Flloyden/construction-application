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

    public Optional<AccountEntity> findFirstByUsernameAndPassword(String username, String password) {
        return accountDao.findFirstByUsernameAndPassword(username, password);
    }

    public AccountEntity createAccount(AccountEntity account) {
        return accountDao.save(account);
    }

    public List<AccountEntity> getAllAccountEntities() {
        return accountDao.findAll();
    }

    public Optional<AccountEntity> getAccount(Long id) {
        return accountDao.findById(id);
    }

    public void deleteAccount(Long id) {
        accountDao.deleteById(id);
    }

    public void updateUserInfo(AccountEntity account) {
        Optional<AccountEntity> accountEntity = accountDao.findById(account.getId());

        accountEntity.ifPresent(entity -> {
            entity.setUsername(account.getUsername());
            entity.setEmail(account.getUsername());
            entity.setProfileImage(account.getUsername());
            accountDao.save(entity);
        });
    }
}
