package com.example.constructionappapi.services.businessLogicLayer.repositories.accounting;

import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;

import java.util.List;
import java.util.Optional;

/**
 * A interface to function as a model for all the repositories
 */
public interface IAccountingRepository {
    AccountingEntity createAccounting(AccountingEntity accounting);

    AccountingEntity editAccounting(AccountingEntity accounting);

    List<AccountingEntity> getAllAccountingEntities();

    Optional<AccountingEntity> getAccounting(Long id);

    void deleteAccounting(Long id);
}
