package com.example.constructionappapi.services.dataAccessLayer.dao;


import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * A class that gives access to interaction with the table account in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
 */
public interface AccountDao extends JpaRepository<AccountEntity, Long> {
    AccountEntity findFirstByEmail(String email);

    Optional<AccountEntity> findFirstByRecoveryToken(String token);

    Optional<AccountEntity> findFirstByRefreshToken(String refreshToken);

}
