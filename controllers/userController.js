const express = require("express");
const router = express.Router();
const db = require ("../models");

// ROUTES FOR USER

router.get("/user", (req, res)  =>  {
    db.User.findAll().then(allUsers =>  {
        res.render(`all-users`);
    })
})

router.get("/user/:id", (req, res)  =>  {
    res.render("one-user")
})

router.get("/user/:id/edit",    (req, res)  =>  {
    res.render("edit-user");
})

router.get("user/new", (req, res)   =>  {
    res.render("new-user")
})

// API ROUTES

router.post("/api/users", (req, res)    =>  {
    db.User.create(req, body).then(newUser  =>  {
        res.json({
            error: false,
            data: newItem,
            message: "It's alive! It's alive!"
        })
    }).catch((err)  =>  (
        res.status(500).json({        
            error: true,
            data: err,
            message: "You have failed the new user!"})
})