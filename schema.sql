DROP DATABASE IF EXISTS movies;

CREATE DATABASE `movies`;

USE `movies`;


CREATE TABLE `movies` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `watched` BOOLEAN
);

ALTER TABLE `movies` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `movies` (`id`,`title`, `watched`) VALUES
(1,'Gladiator', false);