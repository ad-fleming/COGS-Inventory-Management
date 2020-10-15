const express = require("express");
const router = express.Router();
const db = require ("../models");


// RENDERS FOR USER

// IF WE WANT TO DISPLAY ALL USERS 
router.get("/users", function(req,res){
    db.User.findAll()
    .then((users)=>{
        console.log(users);
        res.render("#", {users})
    })
    .catch((err)=>{
        console.log(err);
    })
})

// DISPLAYS A PARTICULAR User's info to the newUser.handlebars file
router.get("/users/welcome/:id", (req,res)=>{
    db.User.findOne({
        where:{
            id: req.params.id
        }
    }).then((user)=>{
        res.render("newUser", {user})
    }).catch((err)=>{
        console.log(err)
    })
})

// ROUTE CAN BE HOOKED UP TO USER ACCOUNT EDIT PAGE
router.get("/user/edit/:id",    (req, res)  =>  {
    db.User.findOne({
        where:{
            id: req.params.id
        }
    }).then((user)=>{
        res.render("#", {user})
    })
})

// API ROUTES

// FIND A ALL USERS
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

// FIND A SPECIFIC USER
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
        // InventoryId : req.body.InventoryId
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

// UPDATE A USER
router.put("/api/users/", (req, res) =>  {
    db.User.update(req.body,{
        where: {
            id: req.body.id
        }
    })
    .then(function(dbUser)  {
        res.json(dbUser)
    })
})

// DELETE A USER
router.delete("/api/users/:id", (req, res)  =>  {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbUser)    {
        res.json(dbUser)
    }).catch((err)=>{
        console.log(err);
    })
})


module.exports = router;