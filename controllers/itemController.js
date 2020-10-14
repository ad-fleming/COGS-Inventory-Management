const express = require("express");
const router = express.Router();
const db = require ("../models");

// ROUTES FOR ITEMS

router.get("/items", (req,res)  =>  {
    db.Item.findAll().then(allItems =>  {
        res.render("all-items")
    }) 
});


router.get("/items/:id", (req, res) =>  {
    res.render("one-item")
})

router.get("/items/:id/edit",   (req,res)   =>  {
    res.render("edit-item");
});

router.get("/items/new", (req, res) =>  {
    res.render("new-item")
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

router.get("/api/item/:id", (req,res)=>{
    db.Item.findAll({
        where:{
            unit_name:req.params.id
        }
    }).then((specificItem)=>{
        console.log(specificItem);
        res.json(specificItem)
    })
    .catch((err)=>{
        console.log(err);
    })
})

// CREATE A NEW ITEM
router.post("/api/items", (req, res)    =>  {
    const newItem = {
        unit_name: req.body.unit_name,
        unit_category: req.body.unit_category,
        unit_distributor: req.body.unit_distributor,
        unit_price: req.body.unit_price,
        unit_par: req.body.unit_par,
        items_per_unit: req.body.items_per_unit,
        item_count_type: req.body.item_count_type,
        item_count_par: req.body.item_count_par,
        InventoryId: req.body.InventoryId
    }
    db.Item.create(newItem)
        .then((newItem)=>{
            console.log(newItem);
            res.json({
                message: "created new item",
                success: true
            })
        })
        .catch((err)=>{
            console.log(err);
        })
})



module.exports = router;