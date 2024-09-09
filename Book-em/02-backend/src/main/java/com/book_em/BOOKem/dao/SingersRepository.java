package com.book_em.BOOKem.dao;

import com.book_em.BOOKem.entity.Singers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

public interface SingersRepository extends JpaRepository<Singers, Long> {
    List<Singers> findByGenre(String genre);
    List<Singers> findByNameContaining(String name);
    @Query("SELECT DISTINCT s.genre FROM Singers s") // Ensure this query is correct
    List<String> findDistinctGenres();
}
