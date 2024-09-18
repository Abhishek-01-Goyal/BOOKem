CREATE TABLE Singers (
    singer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    genre VARCHAR(255),
    rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5),
    price_per_hour DECIMAL(10, 2),
    profile_image VARCHAR(255),
    availability BOOLEAN DEFAULT TRUE,
    location VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
