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

router.post("/api/items", (req, res)    =>  {
    db.Item.create(req.body).then(newItem   =>  {
        res.json({
            error: false,
            data: newItem,
            message: "You created a new item!"
        })
    }).catch((err)  =>  {
        res.status(500).json({
            error: true,
            data: err,
            message:"You did not create an item! LOSER!"
        })  
    })
})

module.exports = router;