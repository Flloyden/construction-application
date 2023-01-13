package com.example.constructionappapi.services.dataAccessLayer.dao;


import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * A class that gives access to interaction with the table account in the DB (save, find, update, delete,
 * etc, given by JpaRepository).
 */
public interface AccountDao extends JpaRepository<AccountEntity, Long> {
    Optional<AccountEntity> findFirstByNameAndPassword(String username, String password);

    AccountEntity findFirstByEmail(String email);

    Optional<AccountEntity> findFirstByRecoveryToken(String token);

    Optional<AccountEntity> findFirstByEmailAndRefreshToken(String email, String refreshToken);

    Optional<AccountEntity> findFirstByRefreshToken(String refreshToken);

    Optional<AccountEntity> findFirstByEmailAndPassword(String email, String encode);
}
