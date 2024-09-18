CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer') NOT NULL,
    amount DECIMAL(10, 2),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);
