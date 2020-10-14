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
router.get("api/inventory/:id", (req,res)=>{
    db.inventory.findAll({
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

router.post ("api/inventory", (req,res)=>{
    db.Inventory.create({
      inventory_date: req.body.inventory_date,
      UserId: req.body.UserId  
    })
    .then((inventory)=>{
        console.log(inventory);
        res.json(inventory);
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router;