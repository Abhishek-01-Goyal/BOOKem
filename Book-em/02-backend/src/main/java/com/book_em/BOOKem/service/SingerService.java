package com.book_em.BOOKem.service;

import com.book_em.BOOKem.entity.Singer;
import com.book_em.BOOKem.dao.SingerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SingerService {
    @Autowired
    private SingerRepository singerRepository;

    public List<Singer> getAllSingers() {
        return singerRepository.findAll();
    }

    public List<Singer> findSingersByGenre(String genre) {
        return singerRepository.findByGenre(genre);
    }

    public Singer getSingerById(Integer id) {
        Optional<Singer> singer = singerRepository.findById(id);
        return singer.orElse(null);
    }
}
