const express = require("express");
const router = express.Router();
const db = require ("../models");

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

// DISPLAY A USER'S ITEMS BY INVENTORY NUMBER (SHOW THEM THAT WEEK'S INVENTORY)
router.get("/items/user/inventory/:id", (req,res)=>{
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
    .then((masterInventory)=>{
        // res.json(weeklyInventoryItems)
        res.render("masterInventory",{
            masterInventory
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