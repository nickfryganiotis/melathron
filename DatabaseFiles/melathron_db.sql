create schema melathron;
USE melathron;

CREATE TABLE job (
	job_id INT AUTO_INCREMENT,
    category VARCHAR(50),
    profession VARCHAR(50),
    PRIMARY KEY(job_id)
    );

CREATE TABLE continent (
	continent_name VARCHAR(20),
    PRIMARY KEY(continent_name)
    );

CREATE TABLE location (
	location_id INT AUTO_INCREMENT,
    country VARCHAR(20),
    state VARCHAR(20),
    city VARCHAR(20),
    area VARCHAR(20),
    continent_name VARCHAR(20),
    PRIMARY KEY(location_id),
    FOREIGN KEY(continent_name) REFERENCES continent(continent_name)
    );

CREATE TABLE customer (
	spcode INT AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    fathers_name VARCHAR(20),
    company_name VARCHAR(100),
    website VARCHAR(30),
    email VARCHAR(30),
    address_street VARCHAR(20),
    address_number VARCHAR(20),
    address_postal_code VARCHAR(20),
    fax VARCHAR(20),
    comments VARCHAR(200),
    personnel INT,
    job_id INT,
    location_id INT,
    PRIMARY KEY(spcode),
    FOREIGN KEY(job_id) REFERENCES job(job_id),
    FOREIGN KEY(location_id) REFERENCES location(location_id)
    );
    
CREATE TABLE phone (
	spcode INT,
    phone_number VARCHAR(15),
    PRIMARY KEY(spcode, phone_number),
    FOREIGN KEY(spcode) REFERENCES customer(spcode)
    );
    
CREATE TABLE mobile (
	spcode INT,
    mobile_number VARCHAR(15),
    PRIMARY KEY(spcode, mobile_number),
    FOREIGN KEY(spcode) REFERENCES customer(spcode)
    );

CREATE TABLE apotelesma (
	apotelesma_id INT AUTO_INCREMENT,
    apotelesma_name VARCHAR(50),
    subapotelesma_name VARCHAR(50),
    continent_name VARCHAR(20),
    PRIMARY KEY(apotelesma_id),
    FOREIGN KEY(continent_name) REFERENCES continent(continent_name) 
    );

  
CREATE TABLE history_instance (
	instance_date DATETIME,
    spcode INT,
    apotelesma_id INT,
    PRIMARY KEY(instance_date, spcode, apotelesma_id),
    FOREIGN KEY(spcode) REFERENCES customer(spcode),
    FOREIGN KEY(apotelesma_id) REFERENCES apotelesma(apotelesma_id)
    );

CREATE TABLE subscription (
	subscription_id INT AUTO_INCREMENT,
    subscription_name VARCHAR(50),
    PRIMARY KEY (subscription_id)
    );

CREATE TABLE salesman (
	salesman_id INT AUTO_INCREMENT,
    salesman_first_name VARCHAR(20),
    salesman_last_name VARCHAR(20),
    PRIMARY KEY(salesman_id)
    );

CREATE TABLE works_on (
	spcode INT,
    salesman_id INT,
    PRIMARY KEY(spcode, salesman_id),
    FOREIGN KEY(spcode) REFERENCES customer(spcode),
    FOREIGN KEY(salesman_id) REFERENCES salesman(salesman_id)
    );

CREATE TABLE sale (
	sale_id INT AUTO_INCREMENT,
	order_date DATETIME,
    total_amount FLOAT,
    shipping_method VARCHAR(100),
    voucher VARCHAR(20),
    number_of_doses SMALLINT,
    paid BOOLEAN DEFAULT 0,
    spcode INT,
    subscription_id INT,
    salesman_id INT,
    PRIMARY KEY(sale_id),
    FOREIGN KEY(spcode) REFERENCES customer(spcode),
    FOREIGN KEY(salesman_id) REFERENCES salesman(salesman_id),
    FOREIGN KEY(subscription_id) REFERENCES subscription(subscription_id)
    );
    
CREATE TABLE payment_info (
	dose_number SMALLINT,
    sale_id INT,
    dose_amount FLOAT,
    payment_amount FLOAT DEFAULT 0,
    dose_deadline DATETIME,
    payment_date DATETIME,
    payment_method VARCHAR(15),
    PRIMARY KEY(dose_number,sale_id),
    FOREIGN KEY(sale_id) REFERENCES sale(sale_id)
    );



DELIMITER //
CREATE FUNCTION check_paid(s_id INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	IF (SELECT SUM(IFNULL(dose_amount,0))
    FROM payment_info
    WHERE sale_id = s_id) = (SELECT total_amount FROM sale WHERE sale_id = s_id) THEN
    RETURN 1;
    ELSE
    RETURN 0;
    END IF;
END//
DELIMITER ;


DELIMITER //
CREATE TRIGGER ins_paid AFTER INSERT ON payment_info
FOR EACH ROW
BEGIN
	UPDATE sale
	SET paid = check_paid(NEW.sale_id)
    WHERE sale_id = NEW.sale_id;
END//

DELIMITER //
CREATE TRIGGER upd_paid AFTER UPDATE ON payment_info
FOR EACH ROW
BEGIN
	UPDATE sale
	SET paid = check_paid(NEW.sale_id)
    WHERE sale_id = NEW.sale_id;
END//



