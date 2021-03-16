create database `voice_app`;

USE `voice_app`;

CREATE TABLE `call_logs` (
    id INT NOT NULL AUTO_INCREMENT,
    conversation_id VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    from_number VARCHAR(20) NOT NULL,
    to_number VARCHAR(20) NOT NULL,
    call_duration INT DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX (`from_number`),
    INDEX (`to_number`)
);