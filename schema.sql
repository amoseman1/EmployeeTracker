DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;

USE company_DB;

CREATE TABLE department (

 id INT AUTO_INCREMENT PRIMARY KEY,
dept_name VARCHAR(30) 

);
CREATE TABLE empRole (

  id  INT AUTO_INCREMENT PRIMARY KEY,
  title   VARCHAR(30) ,
  salary   DECIMAL(6,0),
  department_id   INT 
);
CREATE TABLE employee (

  id  INT AUTO_INCREMENT PRIMARY KEY,
  first_name  VARCHAR(30),
  last_name  VARCHAR(30), 
  role_id  INT NULL,
  manager_id  INT NULL
);

INSERT INTO employee( first_name,last_name, role_id) 
VALUES ('Sarah', 'Drake', 3);

SELECT * FROM department;
SELECT * FROM empRole;
SELECT * FROM employee;