package com.example.constructionappapi.services.businessLogicLayer.repositories.account;

import com.example.constructionappapi.services.dataAccessLayer.dao.AccountDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountRepository {
    @Autowired
    private AccountDao accountDao;
}
