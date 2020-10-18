const express = require("express");
const router = express.Router();
const db = require ("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require ("../middleware/auth")
const jwtSecret = "tesT_sEcrET";




// IF WE WANT TO DISPLAY ALL INVENTORIES IN THE MAIN INVENTORY TABLE (FOR ALL USERS)
router.get("/inventory",auth, (req,res)=>{
    db.Inventory.findAll()
    .then((inventories)=>{
        res.json({inventories})
    })
})


// router.get("/test/:id", auth, (req,res)=>{
//     db.Inventory.findAll({
//         where:{
//             id: req.user
//         }
//     })
// })


// IF WE WANT TO DISPLAY of a user
router.get("/user/:userId/inventory", (req, res) => {
    const inventoryDate = req.query.date
    if (inventoryDate) {
        db.Inventory.findAll({
            where: {
                UserId: req.params.userId,
                inventory_date: req.query.date
            }
        }).then((inventories) => {
            res.json(inventories);
        })
    }
    db.Inventory.findAll({
        where: {
            UserId: req.params.userId,
        }
    }).then((inventories) => {
        res.json(inventories);
    });
})

// FOR DISPLAYING ALL INVENTORIES OF A GIVEN USER
router.get("/inventory/user/:id", (req,res)=>{
    db.Inventory.findAll({
        where:{
            Inventory: req.params.id
        }
    }).then((inventories)=>{
        res.render("#", {inventories})
    })
})

// API ROUTES =====================
// GET ALL Inventories 
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

// GET AN INVENTORY BASED ON ID

router.get("/api/inventory/:UserId", (req,res)=>{
    db.Inventory.findAll({
        where:{
            UserId: req.params.UserId
        }
    }).then((specificInventory)=>{
        console.log(specificInventory);
        res.json(specificInventory)
    })
})

// GET ALL INVENTORIES FOR A PARTICULAR USER
router.get("/api/inventory/user/:id", (req,res)=>{
    db.Inventory.findAll({
        where:{
            UserId: req.params.UserId
        }
    })
    .then((userInventory)=>{
        console.log(userInventory);
        res.json(userInventory);
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


router.put("/api/inventory", (req,res)=>{
    db.Inventory.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        }).then((updatedInventory)=>{
            console.log(updatedInventory);
            res.json({
                message: "Successfully updated inventory",
                success: true
            })
        }).catch((err)=>{
            console.log(err);
            res.json({
                message: "Issue updating inventory",
                success: false
            })
        })
})


router.delete("/api/inventory/:id", (req,res)=>{
    db.Inventory.destroy({
        where:{
            id: req.params.id
        }
    }).then((inventory)=>{
        res.json(inventory)
    }).catch((err)=>{
        console.log(err)
        res.json({
            message: "Issue deleting Inventory",
            success: false
        })
    })
});




module.exports = router;