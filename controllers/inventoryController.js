const express = require("express");
const router = express.Router();
const db = require ("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require ("../middleware/auth")
const jwtSecret = "tesT_sEcrET";




// IF WE WANT TO DISPLAY ALL INVENTORIES IN THE MAIN INVENTORY TABLE (FOR ALL USERS)
router.get("/inventory", (req,res)=>{
    db.Inventory.findAll()
    .then((inventories)=>{
        res.json({inventories})
    }).catch((err)=>{
        console.log(err)
    })
})

// router.get("/mainInventory", auth, (req,res)=>{
//     console.log(req.user);
//     res.render("mainInventory")
// })

// VIEW MASTER INVENTORY WITH ITEMS
router.get("/test", auth, (req,res)=>{
    db.Inventory.findOne({
        where: {
            inventory_date: "0001-01-01",
            UserId: req.user.id, 
        },
        include:[{model: db.Item}]
    }).then((masterInventoryItems)=>{
        // let UserId = masterInventory.UserId
        res.json({
            masterInventoryItems
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({msg: "don't even know"})
    })
})



// IF WE WANT TO DISPLAY 
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
        }).catch((err)=>{
            console.log(err)
        })
    }
    db.Inventory.findAll({
        where: {
            UserId: req.params.userId,
        }
    }).then((inventories) => {
        res.json(inventories);
    }).catch((err)=>{
        console.log(err)
    })
})

// FOR DISPLAYING ALL INVENTORIES OF A GIVEN USER
router.get("/inventory/user/:id", (req,res)=>{
    db.Inventory.findAll({
        where:{
            Inventory: req.params.id
        }
    }).then((inventories)=>{
        res.render("#", {inventories})
    }).catch((err)=>{
        console.log(err)
    })
})

// API ROUTES =====================
// GET ALL Inventories

// router.get("/api/inventory", (req,res)=>{
//     db.Inventory.findAll({})
//     .then((inventories)=>{
//         console.log(inventories);
//         res.json(inventories);
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.json({
//             message: "issue getting all inventories",
//             success:false
//         })
//     })
// })

// GET AN INVENTORIES BASED ON UserD
// router.get("/api/inventory/:UserId", (req,res)=>{
//     db.Inventory.findAll({
//         where:{
//             UserId: req.params.UserId
//         }
//     }).then((specificInventory)=>{
//         console.log(specificInventory);
//         res.json(specificInventory)
//     })
// })


// GET ALL INVENTORIES FOR A PARTICULAR USER
router.get("/api/inventory/user/:id", (req,res)=>{
    db.Inventory.findAll({
        where:{
            UserId: req.params.UserId
        }
    })
    .then((userInventory)=>{
        console.log(userInventory + "LINE 135 INVENTORY CONTROLLER");
        res.json(userInventory);
    })
    .catch((err)=>{
        console.log(err + "LINE 139 INVENTORY CONTROLLER");
    })
})

// Add New Inventory
router.post ("/api/inventory", (req,res)=>{
    const newInventory = {
        inventory_date: req.body.inventory_date,
        UserId: req.body.UserId  
      }
    
    db.Inventory.create(newInventory)
    .then((inventory)=>{
        console.log(inventory + "LINE 152 INVENTORY CONTROLLER");
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
            console.log(updatedInventory + "LINE 169 INVENTORY CONTROLLER");
            res.json({
                message: "Successfully updated inventory",
                success: true
            })
        }).catch((err)=>{
            console.log(err + "LINE 175");
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
        console.log(err + "LINE 192")
        res.json({
            message: "Issue deleting Inventory",
            success: false
        })
    })
});




module.exports = router;