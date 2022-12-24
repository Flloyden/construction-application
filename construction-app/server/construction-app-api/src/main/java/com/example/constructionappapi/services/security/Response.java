package com.example.constructionappapi.services.security;

import com.example.constructionappapi.services.dataAccessLayer.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Response<T> {
    private String message;
    private T object;

    @Data
    @AllArgsConstructor
    public static class User {
        private long id;
        private String name;
        private String email;
        private String profileImage;
        private UserRole userRole;
    }
}




