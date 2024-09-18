CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    client_id INT,
    singer_id INT,
    rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id),
    FOREIGN KEY (client_id) REFERENCES Users(user_id),
    FOREIGN KEY (singer_id) REFERENCES Singers(singer_id)
);
