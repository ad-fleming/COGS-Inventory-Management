const express = require("express");
const router = express.Router();
const db = require ("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "tesT_sEcrET";


router.get("/newItem", (req, res) =>  {
    console.log(req.session);
    const uuid = req.session.userId;   
    res.render("newItem", {id: req.session.userId});
  });

// ROUTES FOR ITEMS
// IF WE WANT TO DISPLAY ALL ITEMS IN DATABASE
router.get("/items", (req,res)  =>  {
    db.Item.findAll().then(items =>  {
        res.render("#", {items})
    }) 
});

// IF WE WANT TO DISPLAY A PARTICULAR ITEM IN THE MAIN ITEM TABLE
router.get("/items/:id", (req, res) =>  {
    db.Item.findOne({
        where: {
            id: req.params.id
        }
    }).then((item)=>{
        res.render("#", {item})
    })
})

// IF WE WANT TO DISPLAY AN EDIT PAGE FOR A PARTICULAR ITEM IN THE MAIN ITEM TABLE
router.get("/items/edit/:id",   (req,res)   =>  {
    db.Item.findOne({
        where: {
            id: req.params.id
        }
    }).then((item)=>{
        res.render("#", {
            item,
            inventory: item.inventory[req.params.id]
        }
        );
    })
    
});

// DISPLAY A USER'S PRIMARY INVENTORY
router.get("/maininventory", (req,res)=>{
    db.Item.findAll({
        where: {
            InventoryId: 1  //ID MUST BE TARGETTED
        },
        include:[
            {
                model: db.Inventory, 
            }
        ]
    })
    .then((mainInventory)=>{
        // res.json(weeklyInventoryItems)
        res.render("mainInventory",{
            mainInventory
        })
    })
})

// DISPLAY category page
router.get("/categoryDisplay", (req,res)=>{
    db.Item.findAll({
        where: {
            InventoryId: 1  //ID MUST BE TARGETTED
        },
        include:[
            {
                model: db.Inventory, 
            }
        ]
    })
    .then((categoryDisplay)=>{
        res.render("categoryDisplay",{
            categoryDisplay
        })
    })
})

// NEW INVENTORY with EMPTY UNIT, ITEM and VALUE fields
router.get("/newInventory", (req,res)=>{
    db.Item.findAll({
        where: {
            InventoryId: 1  //ID MUST BE TARGETTED
        },
        include:[
            {
                model: db.Inventory, 
            }        ]
    })
    .then((newInventory)=>{
        // res.json(weeklyInventoryItems)
        res.render("newInventory",{
            newInventory
        })
    })
})

// DISPLAY A USER'S INVENTORY BASED ON ID
router.get("/inventory/:id", (req,res)=>{
    db.Item.findAll({
        where: {
            InventoryId: req.params.id
        },
        include:[
            {
                model: db.Inventory, 
            }
        ]
    })
    .then((previousInventory)=>{
        // res.json(weeklyInventoryItems)
        res.render("previousInventory",{
            previousInventory
        })
    })
})
    


// API ROUTES
// FIND ALL ITEMS IN THE DATABASE
router.get(`/api/items`, (req, res) => 
    db.Item.findAll()
    .then(allItems =>{
        console.log(allItems)
        res.json(allItems);
    })
    .catch(err => console.log(err)));


// FIND ALL ITEMS FOR A SPECIFIC INVENTORY ID (ALL Items by Inventory Week)
router.get("/api/items/:id", (req,res)=>{
    db.Item.findAll({
        where: {
            InventoryId: req.params.id
        }
    })
    .then((weeklyInventoryItems)=>{
        console.log(weeklyInventoryItems);
        res.json(weeklyInventoryItems)
    })
    .catch((err)=>{
        console.log(err)
        res.json({
            message: "issue returning inventory items"
        })
    })
})

// Find a specific item by name

router.get("/api/items/name/:unit_name", (req,res)=>{
    db.Item.findAll({
        where:{
            unit_name:req.params.unit_name.trim()
        }
    }).then((specificItem)=>{
        console.log(specificItem);
        res.json(specificItem)
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: "Trouble finding item by name",
            success: false
        })
    })
})
// everything is not up to date.
// CREATE A NEW ITEM
router.post("/api/items", (req, res)    =>  {
    const newItem = {
        unit_name: req.body.unit_name.trim(),
        unit_category: req.body.unit_category,
        unit_distributor: req.body.unit_distributor,
        unit_price: req.body.unit_price,
        unit_par: req.body.unit_par,
        items_per_unit: req.body.items_per_unit,
        item_count_type: req.body.item_count_type,
        item_count_par: req.body.item_count_par,
        unit_count: req.body.unit_count,
        item_count: req.body.item_count,
        total_value: req.body.total_value,
    }
    db.Item.create(newItem)
        .then((newItem)=>{
            console.log(newItem);
            res.json(newItem)
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.put("/api/items", (req,res)=>{
    db.Item.update(
        req.body,
        {
            where:{
                id: req.body.id
            }
        })
        .then((updatedItem)=>{
            console.log(updatedItem);
            res.json({
                message: `Successfully updated item`,
                success: true
            })
        }).catch((err)=>{
            console.log(err);
            res.json({
                message: "Issue updating item",
                success: false
            })
        })
})
router.put("/api/items", (req,res)=>{
    db.Item.update(
        req.body,
        {
            where:{
                id: req.body.id
            }
        })
        .then((updatedItem)=>{
            console.log(updatedItem);
            res.json({
                message: `Successfully updated item`,
                success: true
            })
        }).catch((err)=>{
            console.log(err);
            res.json({
                message: "Issue updating item",
                success: false
            })
        })
})



// DELETE ITEM

router.delete("/api/items/:id", (req, res)=>{
    db.Item.destroy({
        where:{
            id: req.params.id
        }
    }).then((item)=>{
        res.json(item)
    }).catch((err)=>{
        console.log(err);
        res.json({
            message: "Issue deleting Item"
        })
    })
});



module.exports = router;