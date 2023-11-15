CREATE SCHEMA `gg_creaciones`;

use `gg_creaciones`;

DROP TABLE IF EXISTS Material;
DROP TABLE IF EXISTS Sale;

CREATE TABLE IF NOT EXISTS Material (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    unit_of_measurement VARCHAR(50) NOT NULL,
    stock FLOAT NOT NULL DEFAULT 0,
    cost FLOAT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_material PRIMARY KEY (id),
    CONSTRAINT chck_non_negative_material_stock CHECK (stock >= 0),
    CONSTRAINT chck_non_negative_material_cost CHECK (cost >= 0)
);

CREATE TABLE IF NOT EXISTS Sale (
	id INT NOT NULL AUTO_INCREMENT,
    income FLOAT NOT NULL,
    cost FLOAT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_sale PRIMARY KEY (id),
    CONSTRAINT chck_non_negative_sale_income CHECK (income >= 0),
    CONSTRAINT chck_non_negative_sale_cost CHECK (cost >= 0)
);