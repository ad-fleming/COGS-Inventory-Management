const express = require("express");
const router = express.Router();
const db = require ("../models");




// API ROUTES =====================

// router.get("/inventory/:id", (req,res)=>{
//     db.inventory.findOne({
//         include: db.User,
//         where:{
//             userID: req.params.id
//         }
//     })
//     .then((inventory)=>{
//         console.log(inventory);
//         res.json(inventory);
//     })
// })

// Get


// GET INVENTORIES BY USER

router.get("/api/inventory", (req,res)=>{
    db.Inventory.findAll({})
    .then((inventories)=>{
        console.log(inventories);
        res.json(inventories);
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            message: "issue getting all inventories",
            success:false
        })
    })
})

router.get("/api/inventory/:id", (req,res)=>{
    db.Inventory.findAll({
        where:{
            UserId: req.params.id
        }
    })
    .then((inventory)=>{
        console.log(inventory);
        res.json(inventory);
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.post ("/api/inventory", (req,res)=>{
    const newInventory = {
        inventory_date: req.body.inventory_date,
        UserId: req.body.UserId  
      }
    
    db.Inventory.create(newInventory)
    .then((inventory)=>{
        console.log(inventory);
        res.json(inventory);
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router;