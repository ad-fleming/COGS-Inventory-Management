const express = require("express");
const router = express.Router();
const db = require ("../models");

// ROUTES FOR USER

router.get("/user", (req, res)  =>  {
    db.User.findAll().then(allUsers =>  {
        
        res.render('all-users');
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

// FIND A SPECIFIC USER

router.get("/api/users/", (req,res)=>{
    db.User.findAll()
    .then((allUsers)=>{
        console.log(allUsers);
        res.json({
            users: allUsers,
            message:"found specific user",
            success: true,
        })
    }).catch((err)=>{
        console.log(err);
    })
})

router.get("/api/users/:id", (req,res)=>{
    db.User.findAll({
        where:{
            id: req.params.id
        }
    })
    .then((specificUser)=>{
        console.log(specificUser);
        res.json({
            user: specificUser,
            message:"found specific user",
            success: true,
        })
    })
})

// CREATE A NEW USER
router.post("/api/users", (req, res)    =>  {
    const newUser = {
        account_name: req.body.account_name,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        InventoryId: req.body.InventoryId
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