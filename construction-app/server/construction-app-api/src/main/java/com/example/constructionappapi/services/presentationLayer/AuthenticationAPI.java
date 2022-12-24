package com.example.constructionappapi.services.presentationLayer;

import com.example.constructionappapi.services.businessLogicLayer.repositories.AccountRepository;
import com.example.constructionappapi.services.security.AuthenticationRequest;
import com.example.constructionappapi.services.security.AuthenticationResponse;
import com.example.constructionappapi.services.security.JwtUtils;
import com.example.constructionappapi.services.dataAccessLayer.entities.AccountEntity;
import com.example.constructionappapi.services.security.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationAPI {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final AccountRepository accountRepository;

    @PostMapping("/authenticate")
    @CrossOrigin(exposedHeaders = "Authorization")
    public ResponseEntity<Response<Response.User>> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response<>("Authentication Failed", null));
        }

        final AccountEntity accountInformation = accountRepository.findUserByEmail(request.getEmail());
        if (accountInformation != null) {
            final Response.User userInformation =
                    new Response.User(
                            accountInformation.getId(),
                            accountInformation.getName(),
                            accountInformation.getEmail(),
                            accountInformation.getProfileImage(),
                            accountInformation.getRole());
            System.out.println(accountInformation.getUsername());

            final Response<Response.User> response = new Response<>();

            response.setMessage("Logged in");
            response.setObject(userInformation);

            ResponseEntity.status(HttpStatus.OK).body(userInformation);
            return ResponseEntity
                    .ok()
                    .header("Authorization", "Bearer " + jwtUtils.generateToken(accountInformation))
                    .body(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response<>("Email not found", null));
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
}
