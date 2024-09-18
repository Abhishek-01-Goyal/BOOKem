package com.book_em.BOOKem.dao;

import com.book_em.BOOKem.entity.Singer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SingerRepository extends JpaRepository<Singer, Integer> {
    List<Singer> findByGenre(String genre);
}
