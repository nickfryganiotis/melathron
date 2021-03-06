CREATE SCHEMA IF NOT EXISTS melathron;
USE melathron;

CREATE TABLE biography (
	biography_id INT AUTO_INCREMENT,
    biography_name VARCHAR(200),
    PRIMARY KEY(biography_id)
);

CREATE TABLE category (
	category_id INT AUTO_INCREMENT,
	category_name VARCHAR(200),
    PRIMARY KEY(category_id)
);

CREATE TABLE profession (
	profession_id INT AUTO_INCREMENT,
    profession_name VARCHAR(200),
    PRIMARY KEY(profession_id)
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


CREATE TABLE apotelesma (
	apotelesma_id INT AUTO_INCREMENT,
    apotelesma_name VARCHAR(100),
    subapotelesma_name VARCHAR(100),
    continent_id INT,
    PRIMARY KEY(apotelesma_id),
    FOREIGN KEY(continent_id) REFERENCES continent(continent_id)
    ON DELETE CASCADE
);

CREATE TABLE location (
	location_id INT AUTO_INCREMENT,
    country_id INT,
    state VARCHAR(100),
    city VARCHAR(100),
    area VARCHAR(100),
    PRIMARY KEY(location_id),
    FOREIGN KEY(country_id) REFERENCES country(country_id)
);

CREATE TABLE salesman (
	salesman_id INT AUTO_INCREMENT,
    salesman_name VARCHAR(60),
    PRIMARY KEY(salesman_id)
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
    comments VARCHAR(500),
    category_id INT,
    profession_id INT,
    apotelesma_id INT,
    continent_id INT,
    country_id INT,
    location_id INT,
    biography_id INT,
    date_changed DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(spcode),
    FOREIGN KEY(category_id) REFERENCES category(category_id)
    ON DELETE CASCADE,
	FOREIGN KEY(profession_id) REFERENCES profession(profession_id)
    ON DELETE CASCADE,
    FOREIGN KEY(apotelesma_id) REFERENCES apotelesma(apotelesma_id)
    ON DELETE CASCADE,
    FOREIGN KEY(continent_id) REFERENCES continent(continent_id),
    FOREIGN KEY(country_id) REFERENCES country(country_id),
    FOREIGN KEY(location_id) REFERENCES location(location_id),
    FOREIGN KEY(biography_id) REFERENCES biography(biography_id)
    );
INSERT INTO sale(spcode, total_amount) VALUES (7, 100);
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
    salesman_id INT,
    PRIMARY KEY(instance_date, spcode, apotelesma_id, salesman_id),
    FOREIGN KEY(spcode) REFERENCES customer(spcode)
    ON DELETE CASCADE,
    FOREIGN KEY(apotelesma_id) REFERENCES apotelesma(apotelesma_id)
    ON DELETE CASCADE,
    FOREIGN KEY(salesman_id) REFERENCES salesman(salesman_id)
    );

CREATE TABLE biography_history (
	instance_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    spcode INT,
    biography_id INT,
    PRIMARY KEY(instance_date, spcode, biography_id),
    FOREIGN KEY(spcode) REFERENCES customer(spcode)
    ON DELETE CASCADE,
    FOREIGN KEY(biography_id) REFERENCES biography(biography_id)
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
    country_id INT,
    PRIMARY KEY(sale_id),
    FOREIGN KEY(spcode) REFERENCES customer(spcode) ON DELETE CASCADE,
    FOREIGN KEY(salesman_id) REFERENCES salesman(salesman_id) ON DELETE CASCADE,
    FOREIGN KEY(subscription_id) REFERENCES subscription(subscription_id) ON DELETE CASCADE,
    FOREIGN KEY(shipping_method_id) REFERENCES shipping_method(shipping_method_id) ON DELETE CASCADE,
    FOREIGN KEY(country_id) REFERENCES country(country_id)
    );

CREATE TABLE payment_info (
	dose_number INT AUTO_INCREMENT,
    sale_id INT,
    dose_amount FLOAT,
    payment_amount FLOAT DEFAULT 0,
    dose_deadline DATETIME,
    payment_date DATETIME,
    payment_method VARCHAR(50),
    PRIMARY KEY(dose_number,sale_id),
    FOREIGN KEY(sale_id) REFERENCES sale(sale_id) ON DELETE CASCADE
    );

CREATE TABLE acc (
	username VARCHAR(20),
    passcode VARCHAR(20),
    admin_priv BOOL default 0,
    PRIMARY KEY(username)
);

CREATE TABLE state (
	state_id INT AUTO_INCREMENT,
    state_name VARCHAR(100),
    country_id INT,
    PRIMARY KEY(state_id),
    FOREIGN KEY(country_id) REFERENCES country(country_id)
);

CREATE TABLE city (
	city_id INT AUTO_INCREMENT,
    city_name VARCHAR(100),
	country_id INT,
    PRIMARY KEY(city_id),
    FOREIGN KEY(country_id) REFERENCES country(country_id)
);

CREATE TABLE area (
	area_id INT AUTO_INCREMENT,
    area_name VARCHAR(100),
	country_id INT,
    PRIMARY KEY(area_id),
    FOREIGN KEY(country_id) REFERENCES country(country_id)
);
    
DELIMITER //
CREATE TRIGGER ins_loc BEFORE INSERT ON location
FOR EACH ROW
BEGIN
    IF NEW.state IS NOT NULL AND (SELECT state_name FROM state WHERE state_name = NEW.state) IS NULL THEN
    INSERT INTO state(state_name, country_id) VALUES (NEW.state, NEW.country_id);
    END IF;
	IF NEW.city IS NOT NULL AND (SELECT city_name FROM city WHERE city_name = NEW.city) IS NULL THEN
    INSERT INTO city(city_name, country_id) VALUES (NEW.city, NEW.country_id);
    END IF;
	IF NEW.area IS NOT NULL AND (SELECT area_name FROM area WHERE area_name = NEW.area) IS NULL THEN
    INSERT INTO area(area_name, country_id) VALUES (NEW.area, NEW.country_id);
    END IF;
END//

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
	SET paid = check_paid(NEW.sale_id), number_of_doses = number_of_doses + 1
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
CREATE TRIGGER del_paid AFTER DELETE ON payment_info
FOR EACH ROW
BEGIN
	UPDATE sale
	SET paid = check_paid(OLD.sale_id), number_of_doses = number_of_doses - 1
    WHERE sale_id = OLD.sale_id;
    
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER upd_date BEFORE UPDATE ON customer
FOR EACH ROW
BEGIN
	UPDATE customer
    SET date_changed = CURRENT_TIMESTAMP;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER curr_bio_in AFTER INSERT ON biography_history
FOR EACH ROW
BEGIN
	UPDATE customer
    SET biography_id = NEW.biography_id
    WHERE spcode = NEW.spcode;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER curr_bio_upd AFTER UPDATE ON biography_history
FOR EACH ROW
BEGIN
	UPDATE customer
    SET biography_id = NEW.biography_id
    WHERE spcode = NEW.spcode;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER curr_bio_del AFTER DELETE ON biography_history
FOR EACH ROW
BEGIN
	UPDATE customer
    SET biography_id = (SELECT biography_id FROM biography_history WHERE spcode=OLD.spcode ORDER BY instance_date DESC LIMIT 1) 
    WHERE spcode = OLD.spcode;
END//
DELIMITER ;
SELECT * FROM history_instance h, apotelesma a WHERE h.apotelesma_id = a.apotelesma_id;
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Continents.txt' INTO TABLE continent FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (continent_id, continent_name);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Countries.txt' INTO TABLE country FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (country_name, continent_id);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Apotelesmata.txt' INTO TABLE apotelesma FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' (subapotelesma_name, apotelesma_name, continent_id);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Shipping_methods.txt' INTO TABLE shipping_method FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (shipping_method_id, shipping_method_name);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Subscriptions.txt' INTO TABLE subscription FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (subscription_name, subscription_category, country_id);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Salesmen.txt' INTO TABLE salesman FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (salesman_name);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Categories.txt' INTO TABLE category FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (category_name);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Professions.txt' INTO TABLE profession FIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (profession_name);
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Biographies.txt' INTO TABLE biography FIELDS TERMINATED BY ';' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\r\n' (biography_name);
INSERT INTO location (country_id, state, city, area) VALUES ( (SELECT country_id FROM country WHERE country_name LIKE 'Ελλάδα'), 'Αττικής', 'Αθήνα', 'Χαλάνδρι');
INSERT INTO location (country_id, state, city, area) VALUES ( (SELECT country_id FROM country WHERE country_name LIKE 'Ελλάδα'), 'Θεσσαλονίκης', 'Θεσσαλονίκη', 'Ωραιόκαστρο');
INSERT INTO location (country_id, state, city, area) VALUES ( (SELECT country_id FROM country WHERE country_name LIKE 'Η.Π.Α.'), 'Washington', 'Seattle', 'Northgate');
INSERT INTO location (country_id, state, city) VALUES ( (SELECT country_id FROM country WHERE country_name LIKE 'Ελλάδα'), 'Αττικής', 'Αθήνα');
INSERT INTO acc VALUES ("melathron", "melathron2021", 1);
INSERT INTO acc VALUES ("giannis_papag", "777777", 0);
