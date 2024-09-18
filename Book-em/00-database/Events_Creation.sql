CREATE TABLE Events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(255),
    event_type VARCHAR(255),
    description TEXT,
    budget DECIMAL(10, 2),
    FOREIGN KEY (client_id) REFERENCES Users(user_id)
);
