package com.example.constructionappapi.services;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.businessLogicLayer.repositories.CalendarColorRepository;
import com.example.constructionappapi.services.dataAccessLayer.UserRole;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.dataAccessLayer.entities.CalendarColorEntity;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

public class ServerInit {
    private final ConfigurableApplicationContext configurableApplicationContext;

    public ServerInit(ConfigurableApplicationContext configurableApplicationContext) {
        this.configurableApplicationContext = configurableApplicationContext;

        addDefaultUser();
        addDefaultColor();
    }

    /**
     * Adds a default user to the database if there's no user already in the database.
     */
    private void addDefaultUser() {
        AccountRepository accountRepository = configurableApplicationContext.getBean(AccountRepository.class);
        Optional<AccountEntity> accountEntityOptional = accountRepository.findById(1L);

        if (accountEntityOptional.isEmpty()) {
            AccountEntity accountEntity = new AccountEntity();
            accountEntity.setId(0);
            accountEntity.setName("admin");
            accountEntity.setEmail("bitsapp.noreply@gmail.com");
            accountEntity.setPassword(new BCryptPasswordEncoder().encode("admin"));
            accountEntity.setRole(UserRole.ADMIN);

            accountRepository.createAccount(accountEntity);
        }
    }

    private void addDefaultColor() {
        CalendarColorRepository calendarColorRepository = configurableApplicationContext.getBean(CalendarColorRepository.class);
        Optional<CalendarColorEntity> colorEntity = calendarColorRepository.findById(1L);

        if (colorEntity.isEmpty()) {
            CalendarColorEntity colorEntity1 = new CalendarColorEntity();
            colorEntity1.setId(0);
            colorEntity1.setWorkColor("#0284C7");
            colorEntity1.setVacationColor("#10B981");
            colorEntity1.setWeekendsColor("#DC2626");

            calendarColorRepository.createCalendarcolor(colorEntity1);
        }
    }
}
