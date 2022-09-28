package com.example.constructionappapi.services;
import com.example.constructionappapi.model.Kund;

import java.util.List;

public interface KundService {
    Kund createKund(Kund kund);

    List<Kund> getAllKunder();
}
