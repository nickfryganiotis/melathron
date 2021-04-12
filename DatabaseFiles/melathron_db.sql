CREATE SCHEMA IF NOT EXISTS melathron;
USE melathron;

CREATE TABLE job (
	job_id INT AUTO_INCREMENT,
    category VARCHAR(50),
    profession VARCHAR(50),
    PRIMARY KEY(job_id)
);

CREATE TABLE continent (
	continent_id INT AUTO_INCREMENT,
	continent_name VARCHAR(20),
    PRIMARY KEY(continent_id)
);

CREATE TABLE country (
	country_id INT AUTO_INCREMENT,
    country_name VARCHAR(50),
    continent_id INT,
    PRIMARY KEY(country_id),
    FOREIGN KEY(continent_id) REFERENCES continent(continent_id)
    ON DELETE CASCADE
);

CREATE TABLE location (
	location_id INT AUTO_INCREMENT,
    country_id INT,
    state VARCHAR(20),
    city VARCHAR(20),
    area VARCHAR(20),
    PRIMARY KEY(location_id),
    FOREIGN KEY(country_id) REFERENCES country(country_id)
    ON DELETE CASCADE
    );
    
CREATE TABLE apotelesma (
	apotelesma_id INT AUTO_INCREMENT,
    apotelesma_name VARCHAR(100),
    subapotelesma_name VARCHAR(100),
    continent_id INT,
    PRIMARY KEY(apotelesma_id),
    FOREIGN KEY(continent_id) REFERENCES continent(continent_id)
    ON DELETE CASCADE
);

CREATE TABLE customer (
	spcode INT AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    fathers_name VARCHAR(20),
    company_name VARCHAR(100),
    personnel INT,
    website VARCHAR(30),
    email VARCHAR(30),
    address_street VARCHAR(20),
    address_number VARCHAR(20),
    address_postal_code VARCHAR(20),
    fax VARCHAR(20),
    comments VARCHAR(200),
    job_id INT,
    location_id INT,
    apotelesma_id INT,
    PRIMARY KEY(spcode),
    FOREIGN KEY(job_id) REFERENCES job(job_id)
    ON DELETE CASCADE,
    FOREIGN KEY(apotelesma_id) REFERENCES apotelesma(apotelesma_id)
    ON DELETE CASCADE,
    FOREIGN KEY(location_id) REFERENCES location(location_id)
    ON DELETE CASCADE
    );

CREATE TABLE phone (
	spcode INT,
    phone_number VARCHAR(15),
    PRIMARY KEY(spcode, phone_number),
    FOREIGN KEY(spcode) REFERENCES customer(spcode)
    ON DELETE CASCADE
    );
    
CREATE TABLE mobile (
	spcode INT,
    mobile_number VARCHAR(15),
    PRIMARY KEY(spcode, mobile_number),
    FOREIGN KEY(spcode) REFERENCES customer(spcode)
    ON DELETE CASCADE
    );
  
CREATE TABLE history_instance (
	instance_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    spcode INT,
    apotelesma_id INT,
    PRIMARY KEY(instance_date, spcode, apotelesma_id),
    FOREIGN KEY(spcode) REFERENCES customer(spcode)
    ON DELETE CASCADE,
    FOREIGN KEY(apotelesma_id) REFERENCES apotelesma(apotelesma_id)
    ON DELETE CASCADE
    );

CREATE TABLE subscription (
	subscription_id INT AUTO_INCREMENT,
    subscription_category VARCHAR(50),
    subscription_name VARCHAR(100),
    country_id INT,
    PRIMARY KEY (subscription_id),
    FOREIGN KEY(country_id) REFERENCES country(country_id)
    ON DELETE CASCADE
    );

CREATE TABLE salesman (
	salesman_id INT AUTO_INCREMENT,
    salesman_name VARCHAR(60),
    PRIMARY KEY(salesman_id)
    );

CREATE TABLE works_on (
	spcode INT,
    salesman_id INT,
    PRIMARY KEY(spcode, salesman_id),
    FOREIGN KEY(spcode) REFERENCES customer(spcode)
    ON DELETE CASCADE,
    FOREIGN KEY(salesman_id) REFERENCES salesman(salesman_id)
    ON DELETE CASCADE
    );

CREATE TABLE shipping_method (
	shipping_method_id INT AUTO_INCREMENT,
    shipping_method_name VARCHAR(50),
    PRIMARY KEY(shipping_method_id)
    );

CREATE TABLE sale (
	sale_id INT AUTO_INCREMENT,
	order_date DATETIME,
    total_amount FLOAT,
    shipping_method_id INT,
    voucher VARCHAR(20),
    number_of_doses SMALLINT,
    paid BOOLEAN DEFAULT 0,
    spcode INT,
    subscription_id INT,
    salesman_id INT,
    PRIMARY KEY(sale_id),
    FOREIGN KEY(spcode) REFERENCES customer(spcode) ON DELETE CASCADE,
    FOREIGN KEY(salesman_id) REFERENCES salesman(salesman_id) ON DELETE CASCADE,
    FOREIGN KEY(subscription_id) REFERENCES subscription(subscription_id) ON DELETE CASCADE,
    FOREIGN KEY(shipping_method_id) REFERENCES shipping_method(shipping_method_id) ON DELETE CASCADE
    );

CREATE TABLE payment_info (
	dose_number INT,
    sale_id INT,
    dose_amount FLOAT,
    payment_amount FLOAT DEFAULT 0,
    dose_deadline DATETIME,
    payment_date DATETIME,
    payment_method VARCHAR(15),
    PRIMARY KEY(dose_number,sale_id),
    FOREIGN KEY(sale_id) REFERENCES sale(sale_id) ON DELETE CASCADE
    );

CREATE TABLE acc (
	username VARCHAR(20),
    passcode VARCHAR(20),
    admin_priv BOOL default 0,
    PRIMARY KEY(username)
);
    
    
DELIMITER //
CREATE FUNCTION check_paid(s_id INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	IF (SELECT SUM(IFNULL(payment_amount,0))
    FROM payment_info
    WHERE sale_id = s_id) = (SELECT total_amount FROM sale WHERE sale_id = s_id) THEN
    RETURN 1;
    ELSE
    RETURN 0;
    END IF;
END//
DELIMITER ;


DELIMITER //
CREATE TRIGGER ins_paid_date BEFORE INSERT ON payment_info
FOR EACH ROW
BEGIN
    IF NEW.payment_amount = NEW.dose_amount THEN
    SET NEW.payment_date = CURRENT_TIMESTAMP;
    END IF;
END//

DELIMITER //
CREATE TRIGGER ins_paid AFTER INSERT ON payment_info
FOR EACH ROW
BEGIN
	UPDATE sale
	SET paid = check_paid(NEW.sale_id)
    WHERE sale_id = NEW.sale_id;
END//

DELIMITER //
CREATE TRIGGER upd_paid_date BEFORE UPDATE ON payment_info
FOR EACH ROW
BEGIN
    IF NEW.payment_amount = NEW.dose_amount THEN
    SET NEW.payment_date = CURRENT_TIMESTAMP; 
    ELSE
    SET NEW.payment_date = NULL; 
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER upd_paid AFTER UPDATE ON payment_info
FOR EACH ROW
BEGIN
	UPDATE sale
	SET paid = check_paid(NEW.sale_id)
    WHERE sale_id = NEW.sale_id;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER curr_apotelesma_in AFTER INSERT ON history_instance
FOR EACH ROW
BEGIN
	UPDATE customer
    SET apotelesma_id = NEW.apotelesma_id
    WHERE spcode = NEW.spcode;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER curr_apotelesma_upd AFTER UPDATE ON history_instance
FOR EACH ROW
BEGIN
	UPDATE customer
    SET apotelesma_id = NEW.apotelesma_id
    WHERE spcode = NEW.spcode;
END//
DELIMITER ;


LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Continents.txt' INTO TABLE continent FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (continent_id, continent_name);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Countries.txt' INTO TABLE country FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (country_name, continent_id);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Apotelesmata.txt' INTO TABLE apotelesma FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (subapotelesma_name, apotelesma_name, continent_id);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Shipping_methods.txt' INTO TABLE shipping_method FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (shipping_method_id, shipping_method_name);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Subscriptions.txt' INTO TABLE subscription FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (subscription_name, subscription_category, country_id);
INSERT INTO location (country_id, state, city, area) VALUES ( (SELECT country_id FROM country WHERE country_name LIKE 'Ελλάδα'), 'Αττικής', 'Αθήνα', 'Χαλάνδρι');
INSERT INTO location (country_id, state, city, area) VALUES ( (SELECT country_id FROM country WHERE country_name LIKE 'Ελλάδα'), 'Θεσσαλονίκης', 'Θεσσαλονίκη', 'Ωραιόκαστρο');
INSERT INTO location (country_id, state, city, area) VALUES ( (SELECT country_id FROM country WHERE country_name LIKE 'Η.Π.Α.'), 'Washington', 'Seattle', 'Northgate');
INSERT INTO salesman (salesman_name) VALUES ("Νικόλαος Φρυγανιώτης");
INSERT INTO job (category, profession) VALUES ("Ιατρός", "Παθολόγος");
INSERT INTO job (category, profession) VALUES ("Ιατρός", "Γυναικολόγος");
