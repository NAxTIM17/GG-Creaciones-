CREATE SCHEMA `gg_creaciones`;

use `gg_creaciones`;

DROP TABLE IF EXISTS material;
DROP TABLE IF EXISTS material_cost;
DROP TABLE IF EXISTS material_stock;
DROP TABLE IF EXISTS sale;

CREATE TABLE IF NOT EXISTS material (
	id INT NOT NULL UNIQUE AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    unit_of_measurement VARCHAR(50) NOT NULL,
    CONSTRAINT pk_material PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS material_cost (
	material_id INT NOT NULL,
    value FLOAT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_material_cost__material
    FOREIGN KEY (material_id)
    REFERENCES material (id),
    CONSTRAINT chck_greater_than_zero_material_cost_value CHECK (value > 0)
);

CREATE TABLE IF NOT EXISTS material_stock (
	material_id INT NOT NULL,
    value FLOAT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_material_stock__material
    FOREIGN KEY (material_id)
    REFERENCES material (id)
);

CREATE TABLE IF NOT EXISTS sale (
	id INT NOT NULL UNIQUE AUTO_INCREMENT,
    income FLOAT NOT NULL,
    cost FLOAT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_sale PRIMARY KEY (id),
    CONSTRAINT chck_non_negative_sale_income CHECK (income >= 0),
    CONSTRAINT chck_non_negative_sale_cost CHECK (cost >= 0)
);
