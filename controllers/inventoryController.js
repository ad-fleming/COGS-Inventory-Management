const express = require("express");
const router = express.Router();
const db = require ("../models");

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


// router.post ("/inventory", (req,res)=>{
//     db.inventory.create({
//       unit_count: req.body.unit_count,
//       item_count: req.body.item_count,
//       total_value:req.body.total_value,
//       inventory_date: req.body.inventory_date,
//       userID: req.body.userID  
//     })
//     .then((inventory)=>{
//         console.log(inventory);
//         res.json(inventory);
//     })
// })

module.exports = router;