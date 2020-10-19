const express = require("express");
const router = express.Router();
const db = require ("../models");



// VIEW ROUTE TO NEW ITEMS PAGE
router.get("/newItem", (req, res) =>  {  
    res.render("newItem");
  });

// VIEW ROUTE FOR 
router.get("/weeklyInventory/:id", (req,res)=>{
    db.Item.findAll({
        where: {
            InventoryId: req.params.id
        }, 
        include: [
            {
                model:dbInventory
            }
        ]
    })
    .then((weeklyInventoryItems)=>{
        console.log(weeklyInventoryItems);
        res.render("newInventory", {weeklyInventoryItems})
    })
    .catch((err)=>{
        console.log(err)
        res.json({
            message: "issue returning inventory items"
        })
    })
})

//================= API ROUTES===========================

// POST AN ITEM TO A PARTICULAR Inventory
router.post("/post-item/:id",(req,res)=>{
    db.Item.create({
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
            InventoryId: req.params.id
    }).then((postedItem)=>{
        res.json(postedItem)
    }).catch((err)=>{
        console.log(err);
        res.json({
            message: "Issue Posting item to inventory"
        })
    })
})

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


// Update SPECIFIC ITEM

router.put("/changeItem/:id", (req,res)=>{
    db.Item.update(
        req.body,
        {
            where:{
                id: req.params.id
            }
        }).then((updatedItem)=>{
            res.json(updatedItem)
        }).catch((err)=>{
            console.log(err);
            res.json({
                message: "Issue updating Item"
            })
        })
})


// UPDATE ITEM FROM PAGE
router.put("/updateItem/:id", (req,res)=>{
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












// // IF WE WANT TO DISPLAY A PARTICULAR ITEM IN THE MAIN ITEM TABLE
// router.get("/items/:id", (req, res) =>  {
//     db.Item.findOne({
//         where: {
//             id: req.params.id
//         }
//     }).then((item)=>{
//         res.render("#", {item})
//     })
// })

// IF WE WANT TO DISPLAY AN EDIT PAGE FOR A PARTICULAR ITEM IN THE MAIN ITEM TABLE
// router.get("/items/edit/:id",   (req,res)   =>  {
//     db.Item.findOne({
//         where: {
//             id: req.params.id
//         }
//     }).then((item)=>{
//         res.render("#", {
//             item,
//             inventory: item.inventory[req.params.id]
//         }
//         );
//     })
    
// });

// DISPLAY category page
// router.get("/categoryDisplay", (req,res)=>{
//     db.Item.findAll({
//         where: {
//             InventoryId: 1  //ID MUST BE TARGETTED
//         },
//         include:[
//             {
//                 model: db.Inventory, 
//             }
//         ]
//     })
//     .then((categoryDisplay)=>{
//         res.render("categoryDisplay",{
//             categoryDisplay
//         })
//     })
// })

// // NEW INVENTORY with EMPTY UNIT, ITEM and VALUE fields
// router.get("/newInventory/", (req,res)=>{
//     db.Item.findAll({
//         where: {
//             InventoryId: 1  //ID MUST BE TARGETTED
//         },
//         include:[
//             {
//                 model: db.Inventory, 
//             }        ]
//     })
//     .then((newInventory)=>{
//         // res.json(weeklyInventoryItems)
//         res.render("newInventory",{
//             newInventory
//         })
//     })
// })

// Find a specific item by name
// router.get("/api/items/name/:unit_name", (req,res)=>{
//     db.Item.findAll({
//         where:{
//             unit_name:req.params.unit_name.trim()
//         }
//     }).then((specificItem)=>{
//         console.log(specificItem);
//         res.json(specificItem)
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.json({
//             message: "Trouble finding item by name",
//             success: false
//         })
//     })
// })



// Add an Item to Master Inventory
router.post("/api/addToMain", (req,res) =>{
    db.Item.create({
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
    })
})  
    
// router.get("/masterInventoryItems", (req, res)=>{
//     db.Item.findAll({
//         where: {
//             InventoryId = 1,
//             include: [

//             ]
//         }
//     })
// })


// // CREATE A NEW Master Inventory ITEM
// router.post("/api/addToMaster",auth, (req,res)=>{
    
//     db.Inventory.findOne({
//         where: {
//             inventory_date: "0001-01-01",
//             UserId: req.user.id
//         }
//     }).then((masterInventory)=>{
//         const newItem = {
//             unit_name: req.body.unit_name.trim(),
//             unit_category: req.body.unit_category,
//             unit_distributor: req.body.unit_distributor,
//             unit_price: req.body.unit_price,
//             unit_par: req.body.unit_par,
//             items_per_unit: req.body.items_per_unit,
//             item_count_type: req.body.item_count_type,
//             item_count_par: req.body.item_count_par,
//             unit_count: req.body.unit_count,
//             item_count: req.body.item_count,
//             total_value: req.body.total_value,
//             InventoryId: masterInventory.id
//         }
//         db.Item.create(newItem)
//             .then((newItem)=>{
//                 console.log(newItem);
//                 res.json(newItem)
//             })
//             .catch((err)=>{
//                 console.log(err);
//             })
//     })
// })


router.post("/api/items/:id", (req, res)    =>  {
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
        InventoryId: req.params.id
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

module.exports = router;