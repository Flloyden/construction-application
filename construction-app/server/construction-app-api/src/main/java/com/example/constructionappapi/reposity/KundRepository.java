package com.example.constructionappapi.reposity;

import com.example.constructionappapi.entities.KundEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KundRepository extends JpaRepository<KundEntity, Long>{
}
