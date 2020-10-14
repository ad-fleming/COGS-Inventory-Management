DROP DATABASE IF EXISTS cogs_db;

CREATE DATABASE cogs_db;

USE cogs_db;

create table users (
id INTEGER auto_increment NOT NULL,
account_name varchar(100),
email varchar(100),
name varchar(100),
password varchar(100),
items_id int,
PRIMARY KEY (id)
);


create table items (
id INTEGER auto_increment NOT NULL,
unit_name VARCHAR(100),
unit_category VARCHAR(100),
unit_distributor VARCHAR(100),
unit_price int NOT NULL,
unit_par int,
items_per_unit INT,
item_count_type VARCHAR(100),
item_count_par INT,
inventory_id INT,
users_id INT, 
PRIMARY KEY (id)
);

CREATE TABLE inventory_items (
  id INTEGER auto_increment NOT NULL, 
  unit_count integer,
  item_count integer,
  total_value integer,
  inventory_date date,
  items_id int,
  PRIMARY KEY (id)
);

-- add foreign key for inventory 
alter table users add foreign key (items_id) references items(id);
-- add foreign key for user_id referencing USERS 
alter table items add foreign key (users_id) references users(id);
-- add foreign key for item_id referencing ITEMS
alter table items add foreign key (inventory_id) references inventory_items(id);
-- add foreign key for inventory_id referencing INVENTORY 
alter table inventory_items add foreign key (items_id) references items(id);

-- SEED DATA FOR USERS 
INSERT INTO users (account_name, password, email, name) VALUES ("American Bar", "abacab", "americanbar@gmail.com", "jimmy"), ("Rock N Roll Night Club", "12354", "dominic@hotmail.com", "dominic"), 
("Danny's Tires", "bald13s", "Danny@dannytires.com", "danny"), ("Wine Store", "envinvoveritas", "wineguyr@winerymail.com", "ashley");

SELECT * FROM users;
SELECT * FROM items;

-- SEED DATA FOR ITEMS  
INSERT INTO items (unit_name, unit_category, unit_distributor, unit_price, unit_par, items_per_unit, item_count_type, item_count_par, users_id) 
VALUES ("golden apples", "produce", "luckys produce", 55,  1, 88, "individual", 20, 1), 
("jack daniels", "liquor", "drink and smoke bev", 64,  1, 12, "individual", 5, 1),
 ("dukes mayonnaise", "condiments", "luckys produce", 24, 1, 4, "individual", 1, 1),
 ("marlboro reds", "tobacco", "drink and smoke bev", 30, 1, 10, "individual", 4, 1),
("sani clean", "condiments", "chem club", 120, 1, 4, "individual", 1, 1),
("santa muerta candles", "housewares", "marias candles", 40, 1, 10, "individual", NULL, 1);

-- SEED DATA FOR ITEMS  for inventory week 1
INSERT INTO inventory_items (unit_count, item_count, total_value, inventory_date, items_id) 
VALUES (1, 20, 1000, "2020-12-10", 1),
(2, 5, 500, "2020-12-10", 2),
(0, 3, 1000, "2020-12-10", 3), 
(1, 1, 400, "2020-12-10", 4),
(1, 0, 120, "2020-12-10", 5), 
(0, 20, 200, "2020-12-10", 6);

-- SEED DATA FOR ITEMS  for inventory week 2
INSERT INTO inventory_items (unit_count, item_count, total_value, inventory_date, items_id) 
VALUES (1, 20, 1000, "2020-12-17", 1),
(2, 5, 500, "2020-12-17", 2),
(0, 3, 1000, "2020-12-17", 3), 
(1, 1, 400, "2020-12-17", 4),
(1, 0, 120, "2020-12-17", 5), 
(0, 20, 200, "2020-12-17", 6);

-- SELECT THAT pulls together inventory tables 
SELECT items.unit_name, items.unit_category, items.unit_distributor, items.unit_price, items.unit_par, items.items_per_unit,
items.item_count_type, items.item_count_par, inventory.unit_count, inventory.item_count, inventory.total_value, inventory.inventory_date
FROM items
JOIN inventory_items AS inventory
WHERE inventory.items_id = items.id 
AND inventory.inventory_date = "2020-12-10"
AND items.users_id = 1;
