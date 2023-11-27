USE `gg_creaciones`;

DROP VIEW IF EXISTS StatsByYear;
DROP VIEW IF EXISTS StatsByMonth;
DROP VIEW IF EXISTS StatsByDay;

-- Sales by year
CREATE OR REPLACE VIEW StatsByYear AS
	SELECT
		SUM(s.income) AS Income,
		SUM(s.cost) AS Cost,
		COUNT(s.id) AS Sales,
		YEAR(s.created_at) AS Year
	FROM sale s
	GROUP BY Year
	ORDER BY Year ASC;

-- Sales by month
CREATE OR REPLACE VIEW StatsByMonth AS
	SELECT 
		SUM(s.income) AS Income,
		SUM(s.cost) AS Cost,
		COUNT(s.id) AS Sales,
		Month(s.created_at) AS Month,
		YEAR(s.created_at) AS Year,
		(YEAR(s.created_at) * 365 + MONTH(s.created_at) * 30) AS Period
	FROM sale s 
	GROUP BY Period, Year, Month
	ORDER BY Period ASC;

-- Sales by day
CREATE OR REPLACE VIEW StatsByDay AS
	SELECT 
		SUM(s.income) AS Income,
		SUM(s.cost) AS Cost,
		COUNT(s.id) AS Sales,
		DATE(s.created_at) AS Day
	FROM sale s
	GROUP BY Day
	ORDER BY Day;

-- Materials
CREATE OR REPLACE VIEW ConsultMaterials AS
	SELECT material.name AS Nombre, material_stock.value AS Stock, material.unit_of_measurement AS Unidad, material_cost.value AS Precio 
    FROM material
    INNER JOIN material_stock ON material.id = material_stock.material_id
    INNER JOIN material_cost ON material.id = material_cost.material_id;