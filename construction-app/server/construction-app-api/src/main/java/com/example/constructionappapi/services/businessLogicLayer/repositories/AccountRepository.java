package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.AccountDao;
import org.springframework.beans.factory.annotation.Autowired;

public class AccountRepository {
    @Autowired
    private AccountDao accountDao;
}
