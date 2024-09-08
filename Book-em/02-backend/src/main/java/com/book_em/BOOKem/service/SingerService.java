package com.book_em.BOOKem.service;

import com.book_em.BOOKem.dao.SingersRepository;
import com.book_em.BOOKem.entity.Singers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SingerService {

    @Autowired
    private SingersRepository singerRepository;

    public List<Singers> findByGenre(String genre) {
        return singerRepository.findByGenre(genre);
    }

    public List<Singers> searchByName(String name) {
        return singerRepository.findByNameContaining(name);
    }

    public Singers saveSinger(Singers singer) {
        return singerRepository.save(singer);
    }
}