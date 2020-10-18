const express = require("express");
const router = express.Router();
const db = require ("../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const jwtSecret = "tesT_sEcrET";

// THIS SHOULD BE THE ROUTE THAT USER'S are directed to when clicking 'LOGIN'
// ==============================================================================
router.post('/api/auth', (req,res)=>{
    const {email, password} = req.body;
    // Validation -check database for matching email and password
    if(!email || !password){
        return res.status(400).json({msg: "Please enter all fields"})
    }
    // Check for existing user
    db.User.findOne({
        where:{
            email: req.body.email
        }
    }) //<--TODO: THIS MIGHT HAVE TO BE CHANGED TO WHERE email: req.body.email
    .then(user =>{
        // console.log(user)
        if(!user) return res.status(400).json({msg: "User does not exist"})
        // Validate Password
        // below compares user-typed password to hashed password, returns promise
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"})
            // If it matches, we send token and user
            jwt.sign(
                {id: user.id, account_name: user.account_name, email: user.email, name: user.name}, //<--- Token payload
                jwtSecret,
                {expiresIn: "1h"}, //<---Token will expire in 1 hour, after which user will be logged out (forbidden from page)
                (err, token) =>{ //<---call back function for async
                    if(err) throw err;
                    // If no Error send the token
                    // req.session.userId = user.id;
                    req.headers['authorization']=token;
                    res.json({
                        token, //<----same as token: token in ES6
                        user: {
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

module.exports = router;