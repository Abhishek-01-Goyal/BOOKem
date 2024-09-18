CREATE TABLE Payment_Methods (
    method_id INT AUTO_INCREMENT PRIMARY KEY,
    method_name ENUM('credit_card', 'paypal', 'bank_transfer') NOT NULL
);
