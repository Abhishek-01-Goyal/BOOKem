package com.book_em.BOOKem.controller;

import com.book_em.BOOKem.entity.Singer;
import com.book_em.BOOKem.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/singers")
public class SingerController {
    @Autowired
    private SingerService singerService;

    @GetMapping
    public ResponseEntity<List<Singer>> getAllSingers() {
        List<Singer> singers = singerService.getAllSingers();
        return ResponseEntity.ok(singers);
    }

    @GetMapping("/genre/{genre}")
    public List<Singer> getSingersByGenre(@PathVariable String genre) {
        return singerService.findSingersByGenre(genre);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSingerById(@PathVariable Integer id) {
        try {
            Singer singer = singerService.getSingerById(id);
            if (singer != null) {
                return ResponseEntity.ok(singer);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Singer not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }


}
