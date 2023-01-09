package com.example.constructionappapi.services.businessLogicLayer.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Component
public class JwtUtils {
    private final String JWT_ACCESS_KEY = "q3r6s5v9w1x2y7z8m4n0o1p5k6l2j3h7g8d0e5f9b2c1t4u6i8";
    private final String JWT_REFRESH_KEY = "GpfYFwA7ZDtT3xRJEuKX9vzOyqUiM2sVQW0L8jk1ANmh6rcdCbP5IeHSB4wgTlE";
    private final long JWT_ACCESS_TOKEN_DURATION = TimeUnit.HOURS.toMillis(1);
    private final long JWT_REFRESH_TOKEN_DURATION = TimeUnit.DAYS.toMillis(7);

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(userDetails, claims, JWT_ACCESS_TOKEN_DURATION, JWT_ACCESS_KEY);
    }

    public String generateToken(UserDetails userDetails, Map<String, Object> claims) {
        return createToken(userDetails, claims, JWT_REFRESH_TOKEN_DURATION, JWT_ACCESS_KEY);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUserName(token, JWT_ACCESS_KEY);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, JWT_ACCESS_KEY));
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(userDetails, claims, JWT_REFRESH_TOKEN_DURATION, JWT_REFRESH_KEY);
    }

    public String generateRefreshToken(UserDetails userDetails, Map<String, Object> claims) {
        return createToken(userDetails, claims, JWT_REFRESH_TOKEN_DURATION, JWT_REFRESH_KEY);
    }

    public boolean isRefreshTokenValid(String token, UserDetails userDetails) {
        final String username = extractUserName(token, JWT_REFRESH_KEY);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, JWT_REFRESH_KEY));
    }

    public String createToken(UserDetails userDetails, Map<String, Object> claims, long duration, String jwtSigningKey) {
        return Jwts.builder().setClaims(claims)
                .setSubject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + duration))
                .signWith(SignatureAlgorithm.HS256, jwtSigningKey).compact();
    }

    public boolean isTokenExpired(String token, String jwtSigningKey) {
        return extractExpiration(token, jwtSigningKey).before(new Date());
    }

    public Date extractExpiration(String token, String jwtSigningKey) {
        return extractClaim(token, Claims::getExpiration, jwtSigningKey);
    }

    public String extractUserName(String token, String jwtSigningKey) {
        return extractClaim(token, Claims::getSubject, jwtSigningKey);
    }

    public boolean hasClaim(String token, String claimName, String jwtSigningKey) {
        final Claims claims = extractAllClaims(token, jwtSigningKey);
        return claims.get(claimName) != null;
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver, String jwtSigningKey) {
        final Claims claims = extractAllClaims(token, jwtSigningKey);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token, String jwtSigningKey) {
        return Jwts.parser().setSigningKey(jwtSigningKey).parseClaimsJws(token).getBody();
    }

    public String getJwtAccessKey() {
        return JWT_ACCESS_KEY;
    }

    public String getJwtRefreshKey() {
        return JWT_REFRESH_KEY;
    }
}
