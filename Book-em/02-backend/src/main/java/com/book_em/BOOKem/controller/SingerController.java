package com.book_em.BOOKem.controller;


import com.book_em.BOOKem.entity.Singers;
import com.book_em.BOOKem.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/singers")
public class SingerController {

    @Autowired
    private SingerService singerService;

    @PostMapping("/add")
    public ResponseEntity<Singers> addSinger(@RequestBody Singers singer) {
        Singers newSinger = singerService.saveSinger(singer);
        return ResponseEntity.ok(newSinger);
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Singers>> getSingersByGenre(@PathVariable String genre) {
        List<Singers> singers = singerService.findSingersByGenre(genre);
        return ResponseEntity.ok(singers);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Singers>> searchSingersByName(@RequestParam String name) {
        List<Singers> singers = singerService.searchByName(name);
        return ResponseEntity.ok(singers);
    }

    @GetMapping("/genres") // Ensure this endpoint is correctly mapped
    public ResponseEntity<List<String>> getAllGenres() {
        List<String> genres = singerService.getAllGenres();
        return ResponseEntity.ok(genres);
    }

    // Additional endpoints for singer operations
}
