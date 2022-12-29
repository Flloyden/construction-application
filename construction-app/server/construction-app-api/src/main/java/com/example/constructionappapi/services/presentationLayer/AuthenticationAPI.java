package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.emailRecovery.EmailService;
import com.example.constructionappapi.services.presentationLayer.bodies.AuthenticationRequest;
import com.example.constructionappapi.services.presentationLayer.bodies.PasswordChangeRequest;
import com.example.constructionappapi.services.presentationLayer.bodies.RefreshTokenRequest;
import com.example.constructionappapi.services.presentationLayer.bodies.UserInformation;
import com.example.constructionappapi.services.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.security.SecureRandom;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationAPI {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    @Autowired
    private EmailService emailService;

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/authenticate")
    public ResponseEntity<UserInformation> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            final Optional<AccountEntity> accountEntity = Optional.ofNullable(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())).getPrincipal()).map(AccountEntity.class::cast);
            if (accountEntity.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            return accountEntity.map(user -> {
                user.setRefreshToken(jwtUtils.generateRefreshToken(user));
                accountRepository.save(user);

                return ResponseEntity
                        .status(HttpStatus.OK)
                        .header("Authorization", "Bearer " + jwtUtils.generateToken(user))
                        .header("RefreshToken", user.getRefreshToken())
                        .body(new UserInformation(
                                user.getId(),
                                user.getName(),
                                user.getEmail(),
                                user.getProfileImage(),
                                user.getRole())
                        );
            }).orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refreshToken(@RequestBody RefreshTokenRequest request) {
        // Get the refresh token from the request body
        String refreshToken = request.getRefreshToken();

        // Retrieve the user associated with the refresh token
        Optional<AccountEntity> user = accountRepository.findByRefreshToken(refreshToken);
        if (user.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid email or refresh token");
        }

        // Check that the refresh token has not expired and is still valid
        if (jwtUtils.isTokenExpired(refreshToken)) {
            return ResponseEntity.status(401).body("Refresh token has expired");
        }

        // Generate a new access token and refresh token
        String newAccessToken = jwtUtils.generateToken(user.get());
        String newRefreshToken = jwtUtils.generateRefreshToken(user.get());

        // Update the user's refresh token
        user.get().setRefreshToken(newRefreshToken);
        accountRepository.save(user.get());

        // Return the new access token to the client
        return ResponseEntity
                .ok()
                .header("Authorization", "Bearer " + newAccessToken)
                .header("RefreshToken", newRefreshToken)
                .build();
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        /*
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            String token = authHeader.substring(7);
            jwtUtils.invalidateToken(token);
        }
        */
        return ResponseEntity.ok("Successfully logged out");
    }

    @PostMapping("/initiate-email-recovery")
    public ResponseEntity initiateEmailRecovery(@RequestParam("email") String email) {
        AccountEntity user = accountRepository.findByEmail(email);

        if (user != null) {
            String recoveryToken = generateRecoveryToken();
            user.setRecoveryToken(recoveryToken);
            accountRepository.save(user);

            String emailSubject = "Account Recovery";
            String emailText = "Click this link to recover your account: http://localhost:8080/api/v1/recover?token=" + recoveryToken;
            emailService.sendEmail(email, emailSubject, emailText);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    private String generateRecoveryToken() {
        SecureRandom random = new SecureRandom();
        byte[] tokenBytes = new byte[20];
        random.nextBytes(tokenBytes);
        return DatatypeConverter.printHexBinary(tokenBytes);
    }

    @GetMapping("/recover")
    public ResponseEntity<UserInformation> recoverAccount(@RequestParam("token") String token) {
        return accountRepository
                .findByRecoveryToken(token)
                .map(accountEntity -> authenticate(new AuthenticationRequest(accountEntity.getEmail(), resetPassword(accountEntity))))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    private String resetPassword(AccountEntity accountEntity) {
        // Generate a new random password for the user
        SecureRandom random = new SecureRandom();
        byte[] passwordBytes = new byte[10];
        random.nextBytes(passwordBytes);
        //TODO: Might not need to encrypt here since it gets encrypted below.
        String newPassword = new BCryptPasswordEncoder().encode(DatatypeConverter.printHexBinary(passwordBytes));

        // Set the user's password to the new password
        accountEntity.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        accountRepository.save(accountEntity);
        return newPassword;
    }

    @PostMapping("/user/change-password")
    public ResponseEntity changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        return accountRepository.changePassword(
                passwordChangeRequest.getEmail(),
                passwordChangeRequest.getOldPassword(),
                passwordChangeRequest.getNewPassword(),
                passwordChangeRequest.getNewPasswordConfirmation());
    }

}
