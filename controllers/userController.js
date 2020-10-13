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
    const newUser = {
        account_name: req.body.account_name,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }

    db.User.create(newUser)
        .then((newUser)=>{
            console.log(newUser);
            res.json({
                message: "created new user",
                success: true
            })
        })
        .catch((err)=>{
            console.log(err);
        })
})

module.exports = router;