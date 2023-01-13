package com.example.constructionappapi.services.presentationLayer.bodies;

import com.example.constructionappapi.services.dataAccessLayer.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInformation {
    private long id;
    private String name;
    private String email;
    private String profileImage;
    private UserRole userRole;
}
