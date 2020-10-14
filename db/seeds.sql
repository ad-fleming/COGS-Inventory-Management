create table users (
id INTEGER auto_increment NOT NULL,
account_name varchar(100),
email varchar(100),
name varchar(100),
password varchar(100),
ItemId int,
PRIMARY KEY (id)
);

SELECT * FROM Inventories;
SELECT * FROM Items;
SELECT * FROM Users;

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
unit_count integer,
item_count integer,
total_value integer,
InventoryId INT,
PRIMARY KEY (id)
);

CREATE TABLE inventories (
  id INTEGER auto_increment NOT NULL, 
  inventory_date date,
  UserId int,
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
SELECT * FROM inventories;

-- SEED DATA FOR ITEMS  
INSERT INTO items (unit_name, unit_category, unit_distributor, unit_price, unit_par, items_per_unit, item_count_type, item_count_par, InventoryId, unit_count, item_count, total_value) 
VALUES ("golden apples", "produce", "luckys produce", 55,  1, 88, "individual", 20, 1, 2, 40, 800), 
("jack daniels", "liquor", "drink and smoke bev", 64,  1, 12, "individual", 5, 2, 1, 40, 800),
 ("dukes mayonnaise", "condiments", "luckys produce", 24, 1, 4, "individual", 1, 1, 2, 40, 800),
 ("marlboro reds", "tobacco", "drink and smoke bev", 30, 1, 10, "individual", 4, 1, 2, 40, 700),
("sani clean", "condiments", "chem club", 120, 1, 4, "individual", 1, 1, 2, 40, 800),
("santa muerta candles", "housewares", "marias candles", 40, 1, 10, "individual", 1, 1, 2, 40, 650);

-- SEED DATA FOR ITEMS  for inventory week 1
INSERT INTO inventories (inventory_date, UserId) 
VALUES ("2020-12-10", 1), ("2020-12-17", 1);

SELECT * FROM items
WHERE items.InventoryId = 1;