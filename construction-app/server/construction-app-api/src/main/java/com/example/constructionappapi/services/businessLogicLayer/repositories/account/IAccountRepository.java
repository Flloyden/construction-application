package com.example.constructionappapi.services.businessLogicLayer.repositories.account;

import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;

import java.util.List;
import java.util.Optional;

public interface IAccountRepository {

    Optional<AccountEntity> findFirstByUsernameAndPassword(String username, String password);

    AccountEntity createAccount(AccountEntity account);
    AccountEntity editAccount(AccountEntity account);
    List<AccountEntity> getAllAccountEntities();
    Optional<AccountEntity> getAccount(Long id);
    void deleteAccount(Long id);
}
