const express = require("express");
const router = express.Router();
const db = require ("../models");
// ROUTES FOR ITEMS WILL GO HERE

router.get("/items", (req,res)  =>  {
    db.Item.findAll().then(allItems =>  {
        res.render("all-items")
    }) 
});

router.get("/items/:id", (req, res) =>  {
    res.render("one-item")
})

