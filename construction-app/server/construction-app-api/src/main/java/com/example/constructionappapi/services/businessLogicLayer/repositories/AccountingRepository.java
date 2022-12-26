package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.AccountingDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountingEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AccountingRepository{

    @Autowired
    private AccountingDao accountingDao;

    public AccountingEntity createAccounting(AccountingEntity accounting) {
        return accountingDao.save(accounting);
    }

    public AccountingEntity editAccounting(AccountingEntity accounting) {
        return accountingDao.save(accounting);
    }

    public List<AccountingEntity> getAllAccountingEntities() {
        return accountingDao.findAll();
    }

    public Optional<AccountingEntity> getAccounting(Long id) {
        return accountingDao.findById(id);
    }

    public void deleteAccounting(Long id) {
        accountingDao.deleteById(id);
    }


    public int updateOldAccountingStatus(LocalDate today){
        System.out.println("------ updateOldAccountingStatus() just ran... ------");
        return accountingDao.updateOldAccountingStatus(today);
    }

    public int getOldAccountings() {
        return accountingDao.getOldAccountings().size();
    }

    public int getActiveAccountings() {
        return accountingDao.getActiveAccountings().size();
    }
}
