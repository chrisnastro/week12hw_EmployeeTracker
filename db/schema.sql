DROP DATABASE IF EXISTS employee_info_db;
CREATE DATABASE employee_info_db;

USE employee_info_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);