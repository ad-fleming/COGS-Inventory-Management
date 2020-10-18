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
    })
})

router.get("/mainInventory", auth, (req,res)=>{
    console.log(req.user);
    res.render("mainInventory")
})

// VIEW MASTER INVENTORY WITH ITEMS
router.get("/test", auth, (req,res)=>{
    console.log(req.user + "line 28 inventoryController");
    db.Inventory.findAll({
        where:{
            UserId: req.user.id,
            inventory_date: "0001-01-01"
        }, 
        include: [
            {
              model: db.Item  
            }
        ]
    }).then((inventories)=>{
        console.log(inventories + "line 40 inventoryController")
        // let mainInventory = {
        //     id: inventories.id,
        //     inventory_date: inventories.inventory_date,
        //     ItemId: inventories.Items.id,
        //     itemCount: inventories.Items.item_count,
        //     item_count_par: inventories.Items.item_count_par,
        //     item_count_type: inventories.Items.item_count_type,
        //     items_per_unit: inventories.Items.items_per_unit,
        //     total_value:inventories.Items.total_value,
        //     unit_category: inventories.Items.unit_category,
        //     unit_distributor: inventories.Items.unit_distributor,
        //     unit_name: inventories.Items.unit_name,
        //     unit_par: inventories.Items.unit_par,
        //     unit_price: inventories.Items.unit_price,
        // }
        res.render("mainInventory", {inventories});
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
        console.log(userInventory);
        res.json(userInventory);
    })
    .catch((err)=>{
        console.log(err);
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