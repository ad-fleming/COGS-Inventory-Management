DROP DATABASE IF EXISTS cogs_db;

CREATE DATABASE cogs_db;

USE cogs_db;

create table users (
users_id INT auto_increment,
account_name varchar(100),
email varchar(100),
name varchar(100),
password varchar(100),
inventory_id int,
PRIMARY KEY (users_id)
);

SELECT * FROM inventory;
 
create table inventory (
inventory_id INT auto_increment,
unit_name VARCHAR(100),
unit_category VARCHAR(100),
unit_distributor VARCHAR(100),
unit_price int NOT NULL,
unit_par int,
items_per_unit INT,
item_count_type VARCHAR(100),
item_par INT,
users_id INT,
items_id INT,
PRIMARY KEY (inventory_id)
);

SELECT * FROM inventory;

CREATE TABLE items (
  items_id INT auto_increment,
  unit_count integer,
  item_count integer,
  total_value integer,
  inventory_date date,
  inventory_id int,
  PRIMARY KEY (items_id)
);

SELECT * FROM items;

-- add foreign key for inventory 
alter table users add foreign key (inventory_id) references inventory(inventory_id);
-- add foreign key for user_id referencing USERS 
alter table inventory add foreign key (users_id) references users(users_id);
-- add foreign key for item_id referencing ITEMS
alter table inventory add foreign key (items_id) references items(items_id);
-- add foreign key for inventory_id referencing INVENTORY 
alter table items add foreign key (inventory_id) references inventory(inventory_id);

-- SEED DATA FOR USERS 
INSERT INTO users (account_name, password, email, name) VALUES ("American Bar", "abacab", "americanbar@gmail.com", "jimmy"), ("Rock N Roll Night Club", "12354", "dominic@hotmail.com", "dominic"), 
("Danny's Tires", "bald13s", "Danny@dannytires.com", "danny"), ("Wine Store", "envinvoveritas", "wineguyr@winerymail.com", "ashley");

-- SEED DATA FOR INVENTORY  
INSERT INTO inventory (unit_name, unit_category, unit_distributor, unit_price, unit_par, items_per_unit, item_count_type, item_par, users_id) 
VALUES ("golden apples", "produce", "luckys produce", 55,  1, 88, "individual", 20, 1), 
("jack daniels", "liquor", "drink and smoke bev", 64,  1, 12, "individual", 5, 1),
 ("dukes mayonnaise", "condiments", "luckys produce", 24, 1, 4, "individual", 1, 1),
 ("marlboro reds", "tobacco", "drink and smoke bev", 30, 1, 10, "individual", 4, 1),
("sani clean", "condiments", "chem club", 120, 1, 4, "individual", 1, 1),
("santa muerta candles", "housewares", "marias candles", 40, 1, 10, "individual", NULL, 1);

-- SEED DATA FOR ITEMS  for inventory week 1
INSERT INTO items (unit_count, item_count, total_value, inventory_date, inventory_id) 
VALUES (1, 20, 1000, "2020-12-10", 1),
(2, 5, 500, "2020-12-10", 2),
(0, 3, 1000, "2020-12-10", 3), 
(1, 1, 400, "2020-12-10", 4),
(1, 0, 120, "2020-12-10", 5), 
(0, 20, 200, "2020-12-10", 6);

-- SEED DATA FOR ITEMS  for inventory week 2
INSERT INTO items (unit_count, item_count, total_value, inventory_date, inventory_id) 
VALUES (1, 20, 1000, "2020-12-17", 1),
(2, 5, 500, "2020-12-17", 2),
(0, 3, 1000, "2020-12-17", 3), 
(1, 1, 400, "2020-12-17", 4),
(1, 0, 120, "2020-12-17", 5), 
(0, 20, 200, "2020-12-17", 6);

-- SELECT THAT pulls together inventory tables 
SELECT inventory.unit_name, inventory.unit_category, inventory.unit_distributor, inventory.unit_price, inventory.unit_par, inventory.items_per_unit, inventory.item_count_type, inventory.item_par,
items.unit_count, items.item_count, items.total_value, items.inventory_date
FROM inventory
JOIN items
WHERE inventory.inventory_id = items.inventory_id 
AND items.inventory_date = "2020-12-10"
AND inventory.users_id = 1;