package com.example.constructionappapi.services.businessLogicLayer.repositories.account;

import com.example.constructionappapi.services.dataAccessLayer.dao.AccountDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountRepository implements IAccountRepository {
    @Autowired
    private AccountDao accountDao;

    public Optional<AccountEntity> findFirstByUsernameAndPassword(String username, String password) {
        return accountDao.findFirstByUsernameAndPassword(username, password);
    }
    @Override
    public AccountEntity createAccount(AccountEntity account) {
        return accountDao.save(account);
    }

    @Override
    public AccountEntity editAccount(AccountEntity account) {
        return accountDao.save(account);
    }

    @Override
    public List<AccountEntity> getAllAccountEntities() {
        return accountDao.findAll();
    }

    @Override
    public Optional<AccountEntity> getAccount(Long id) {
        return accountDao.findById(id);
    }

    @Override
    public void deleteAccount(Long id) {
        accountDao.deleteById(id);
    }
}
