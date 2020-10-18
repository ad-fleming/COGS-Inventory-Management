const express = require("express");
const router = express.Router();
const db = require ("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth")
const jwtSecret = "tesT_sEcrET";


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

router.get("/users/email/:email", function(req, res) {
    db.User.findAll({
        where: {
            id: req.params.email
        }
    }).then((user) =>   {
        res.json(user)
    })
})

router.get("/users/welcome/:id", (req,res)=>{
    console.log(req.params.id);
    db.User.findOne({
        where:{
            id: req.params.id
        }
    })
    .then((user)=>{
        console.log(user);
        res.render("newuser", {
            id: user.id,
            account_name: user.account_name,
            email: user.email,
            name: user.name,
            password: user.password
        })
    }).catch((err)=>{
        console.log(err)
    })
})


// DISPLAYS A PARTICULAR User's info to the newUser.handlebars file
// router.get("/users/welcome/:id", (req,res)=>{
//     console.log(req.params.id + " line 36 user controller")
//     db.User.findOne({
//         where:{
//             id: req.params.id.trim()
//         }
//     }).then((user)=>{
//         console.log(user + "line 42")
//         res.render("newuser", {user})
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

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

// ==================CREATE A NEW USER==============================
// == THIS IS THE ROUTE FOR NEW USERS WHO WANT TO SIGN UP
// WILL CHECK FOR AN EXISTING USER, ASSUMING THAT THEIR CREDENTIALS ARE UNIQUE IT WILL CREATE A USER AND HASH THE PASSWORD
router.post("/api/users", (req, res)    =>  {
    const { account_name, email, name, password } = req.body;
    console.log(req.body);
    // SIMPLE VALIDATION
    if(!name || !email || !password){
        return res.status(400).json({msg: "Please enter all fields"})
    }
    // CHECK FOR EXISTING USER
    db.User.findOne({
        where:{
            email: req.body.email
        }
    }) //<---- TODO: SAME AS OTHER. MIGHT NEED TO CHANGE TO WHERE email: req.body.email
        .then(user =>{
            if(user) return res.status(400).json({msg: "User already exists"})
            // IF you make it past this point, create new user
            db.User.create({ //<--- TODO: Can possibly just pass user since we're inside findOne promise
               account_name: req.body.account_name,
               email: req.body.email,
               name: req.body.name,
               password: req.body.password 
            }).then((newUser)=>{
                bcrypt.hash(newUser.password, bcrypt.genSaltSync(15), (err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save() //<--- TODO:Can we even do this or do we need to do an db.User.update?
                        .then(user=>{
                            jwt.sign(
                                {id: user.id}, //<---- payload
                                jwtSecret,
                                {expiresIn: "1h"}, //<--- token lasts for an hour
                                (err,token)=>{ //<--- call back
                                    if(err) throw err;
                                    res.json({
                                        token, //<---- same as token: token in ES6
                                        user:{
                                            id: user.id,
                                            account_name: user.account_name,
                                            user_email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })

})
// ========================
// =========================
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