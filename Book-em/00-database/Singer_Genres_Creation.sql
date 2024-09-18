CREATE TABLE Singer_Genres (
    singer_id INT,
    genre_id INT,
    PRIMARY KEY (singer_id, genre_id),
    FOREIGN KEY (singer_id) REFERENCES Singers(singer_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);
