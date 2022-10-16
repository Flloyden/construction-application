package com.example.constructionappapi.services.businessLogicLayer.repositories.accounting;

import com.example.constructionappapi.services.dataAccessLayer.dao.AccountingDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountingRepository implements IAccountingRepository {

    @Autowired
    private AccountingDao accountingDao;

    @Override
    public AccountingEntity createAccounting(AccountingEntity accounting) {
        return accountingDao.save(accounting);
    }

    @Override
    public AccountingEntity editAccounting(AccountingEntity accounting) {
        return accountingDao.save(accounting);
    }

    @Override
    public List<AccountingEntity> getAllAccountingEntities() {
        return accountingDao.findAll();
    }

    @Override
    public Optional<AccountingEntity> getAccounting(Long id) {
        return accountingDao.findById(id);
    }

    @Override
    public void deleteAccounting(Long id) {
        accountingDao.deleteById(id);
    }
}
