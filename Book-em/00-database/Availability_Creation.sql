CREATE TABLE Availability (
    availability_id INT AUTO_INCREMENT PRIMARY KEY,
    singer_id INT,
    available_from TIME,
    available_to TIME,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    FOREIGN KEY (singer_id) REFERENCES Singers(singer_id)
);
