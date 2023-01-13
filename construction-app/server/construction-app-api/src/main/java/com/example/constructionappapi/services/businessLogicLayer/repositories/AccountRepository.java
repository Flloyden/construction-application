package com.example.constructionappapi.services.businessLogicLayer.repositories;

import com.example.constructionappapi.services.dataAccessLayer.dao.AccountDao;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.presentationLayer.bodies.UserInfoUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.security.SecureRandom;
import java.util.Optional;

/**
 * This class is the middle-man between the Presentation Layer and the Data Access Layer.
 */
@Service
public class AccountRepository {
    @Autowired
    private AccountDao accountDao;

    /**
     * Saves an AccountEntity to the database.
     *
     * @param account AccountEntity to save.
     * @return The saved AccountEntity.
     */
    public AccountEntity createAccount(AccountEntity account) {
        return accountDao.save(account);
    }


    /**
     * Looks for a user in the database based on their ID.
     *
     * @param id ID of the user.
     * @return AccountEntity of the user or empty if not found.
     */
    public Optional<AccountEntity> findById(Long id) {
        return accountDao.findById(id);
    }

    /**
     * Updates user information of a user.
     *
     * @param userInfoUpdateRequest Request-object containing the updated information along with needed authentication.
     * @return Status confirming of denying the success of the update.
     */
    public ResponseEntity<String> updateUserInfo(UserInfoUpdateRequest userInfoUpdateRequest) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        final Optional<AccountEntity> accountEntity = findById(userInfoUpdateRequest.getId());
        if (accountEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Användaren kunde inte hittas");
        }

        if (!bCryptPasswordEncoder.matches(userInfoUpdateRequest.getPassword(), accountEntity.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Fel lösenord");
        }

        accountEntity.ifPresent(entity -> {
            entity.setName(userInfoUpdateRequest.getName());
            entity.setEmail(userInfoUpdateRequest.getEmail());
            entity.setProfileImage(userInfoUpdateRequest.getProfileImage());
            entity.setRole(userInfoUpdateRequest.getUserRole());

            accountDao.save(entity);
        });

        return ResponseEntity.ok().body("Användarinformation ändrad");
    }

    /**
     * Looks for a user in the database based on their e-mail.
     *
     * @param email E-mail of the user.
     * @return AccountEntity of the user or null if not found.
     */
    public AccountEntity findByEmail(String email) {
        return accountDao.findFirstByEmail(email);
    }

    /**
     * Saves a user to the database.
     *
     * @param user AccountEntity containing information of the user to save.
     */
    public void save(AccountEntity user) {
        accountDao.save(user);
    }

    /**
     * Looks for a user in the database based on their refresh token.
     *
     * @param refreshToken Refresh token sent from the frontend.
     * @return Optional with the AccountEntity of the user or empty if not found.
     */
    public Optional<AccountEntity> findByRefreshToken(String refreshToken) {
        return accountDao.findFirstByRefreshToken(refreshToken);
    }

    /**
     * Changes the password of a user.
     *
     * @param email                   E-mail of the user for whom to change password for.
     * @param oldPassword             The users old password.
     * @param newPassword             The user new password.
     * @param newPasswordConfirmation The users new password a second time.
     * @return Status confirming of denying the success of the password change.
     */
    public ResponseEntity<?> changePassword(String email, String oldPassword, String newPassword, String newPasswordConfirmation) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        Optional<AccountEntity> accountEntity = Optional.ofNullable(findByEmail(email));
        if (accountEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Användaren kunde inte hittas");
        }

        if (!bCryptPasswordEncoder.matches(oldPassword, accountEntity.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Fel lösenord");
        }

        if (!newPassword.equals(newPasswordConfirmation)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Lösenorden matchar inte");
        }

        accountEntity.get().setPassword(new BCryptPasswordEncoder().encode(newPassword));
        accountDao.save(accountEntity.get());

        return ResponseEntity.ok().body("Lösenord ändrat");
    }

    /**
     * Creates a new password for the user and updates the DB with the
     * encrypted version of the password.
     *
     * @param accountEntity User for whom to create the password for.
     * @return The new password.
     */
    public String resetPassword(AccountEntity accountEntity) {
        // Generate a new random password for the user
        SecureRandom random = new SecureRandom();
        byte[] passwordBytes = new byte[10];
        random.nextBytes(passwordBytes);
        String newPassword = DatatypeConverter.printHexBinary(passwordBytes);

        // Set the user's password to the new password
        accountEntity.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        save(accountEntity);
        return newPassword;
    }

    /**
     * Looks for a user in the database based on their recovery token.
     *
     * @param token Recovery token sent by frontend.
     * @return Optional with the AccountEntity of the user or empty if not found.
     */
    public Optional<AccountEntity> findByRecoveryToken(String token) {
        return accountDao.findFirstByRecoveryToken(token);
    }

    /**
     * Generates a token used to recover the account.
     *
     * @return Token
     */
    public String generateRecoveryToken() {
        SecureRandom random = new SecureRandom();
        byte[] tokenBytes = new byte[20];
        random.nextBytes(tokenBytes);
        return DatatypeConverter.printHexBinary(tokenBytes);
    }
}
