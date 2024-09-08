CREATE TABLE singers (
    singer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,  -- Foreign key to Users table
    name VARCHAR(100),
    bio TEXT,
    genre VARCHAR(50),
    rating DECIMAL(3, 2),
    price_per_hour DECIMAL(10, 2),
    profile_image VARCHAR(255),
    location VARCHAR(100),
    availability VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
