CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    singer_id INT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    booking_status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    total_price DECIMAL(10, 2),
    hours_booked DECIMAL(4, 2),
    FOREIGN KEY (event_id) REFERENCES Events(event_id),
    FOREIGN KEY (singer_id) REFERENCES Singers(singer_id)
);
