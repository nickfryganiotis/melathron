create schema melathron;
USE melathron;
CREATE TABLE customer (
	spcode INT AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    company_name VARCHAR(100),
    country VARCHAR(20),
    area VARCHAR(20),
    city VARCHAR(20),
    street VARCHAR(20),
    address_number VARCHAR(20),
    postal_code VARCHAR(20),
    mobile VARCHAR(15),
    fax VARCHAR(20),
    email VARCHAR(30),
    profession VARCHAR(50),
    category VARCHAR(50),
    comments VARCHAR(200),
    personnel INT,
    PRIMARY KEY(spcode));
    
CREATE TABLE phone (
	spcode INT,
    phone_number VARCHAR(15),
    PRIMARY KEY(spcode, phone_number),
    FOREIGN KEY(spcode) REFERENCES customer(spcode) );
    
CREATE TABLE apotelesma (
	spcode INT,
    apotelesma_name VARCHAR(50),
    PRIMARY KEY(spcode, apotelesma_name),
    FOREIGN KEY(spcode) REFERENCES customer(spcode) );
    
CREATE TABLE xaraktirismos (
	spcode INT,
    xaraktirismos_name VARCHAR(50),
    PRIMARY KEY(spcode, xaraktirismos_name),
    FOREIGN KEY(spcode) REFERENCES customer(spcode) );

CREATE TABLE subscription (
	subscriptionID INT AUTO_INCREMENT,
    subscription_name VARCHAR(50),
    PRIMARY KEY (subscriptionID) );

CREATE TABLE salesman (
	salesmanID INT AUTO_INCREMENT,
    salesman_first_name VARCHAR(20),
    salesman_last_name VARCHAR(20),
    PRIMARY KEY(salesmanID) );

CREATE TABLE works_on (
	spcode INT,
    salesmanID INT,
    PRIMARY KEY(spcode, salesmanID),
    FOREIGN KEY(spcode) REFERENCES customer(spcode),
    FOREIGN KEY(salesmanID) REFERENCES salesman(salesmanID) );

CREATE TABLE sale (
	spcode INT,
    order_date DATETIME,
    voucher VARCHAR(20),
    receipt VARCHAR(20),
    amount INT,
    payment_method VARCHAR(20),
    money_spent DOUBLE,
    shipping_method VARCHAR(20),
    shipping_date DATETIME,
    paid BOOLEAN,
    balance_date DATETIME,
    salesmanID INT,
    subscriptionID INT,
    PRIMARY KEY(spcode, order_date),
    FOREIGN KEY(spcode) REFERENCES customer(spcode),
    FOREIGN KEY(salesmanID) REFERENCES salesman(salesmanID),
    FOREIGN KEY(subscriptionID) REFERENCES subscription(subscriptionID) );
    
    
    
    