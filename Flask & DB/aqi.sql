-- Create the AQI Database
-- Inspect the two CSV files, and then sketch an ERD of the tables by using QuickDBD Links to an external site.
-- Use the information from the ERD to create a table schema for each CSV file.
-- Note: Remember to specify the data types, primary keys, foreign keys, and other constraints.
-- Save the database schema as a Postgres file named aqi_db_schema.sql, and save it in GitHub repository.
-- Create a new Postgres database, named aqi_db.

-- Using the database schema, create the tables in the correct order to handle the foreign keys.
-- Drop tables if they exist
DROP TABLE IF EXISTS readings CASCADE;

-- Create readings table
CREATE TABLE readings (
  station_id VARCHAR(10) NOT NULL,
	PRIMARY KEY (station_id),
  station VARCHAR(150) NOT NULL,
  aqi VARCHAR(50) NOT NULL,
  co VARCHAR(50) NOT NULL,
  no2 VARCHAR(50) NOT NULL,
  o3 VARCHAR(50) NOT NULL,
  pm25 VARCHAR(50) NOT NULL
);

-- Verify the table creation by running a SELECT statement for each table.

--Print category table
SELECT * FROM readings;



-- Import each CSV file into its corresponding SQL table.

-- Verify that each table has the correct data by running a SELECT statement for each.
--Print campaign table
SELECT * FROM readings;
