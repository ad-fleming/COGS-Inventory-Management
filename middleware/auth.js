// THIS IS MIDDLE WARE FOR AUTHENTICATING USER TOKEN
const configPackage = require('config');
const jwt = require('jsonwebtoken');

// This function grabs the token that is being sent from the Frontend and authenticates it

function auth (req, res, next){
    const token = req.header('x-auth-token');

    // CHECK FOR TOKEN
    if(!token){
        // IF NO TOKEN, RETURN YOU DON'T HAVE CORRECT PERMISSIONS (UNAUTHORIZED STATUS)
        res.status(401).json({msg: "No token present, authorization denied"})
    }

    try{
        // verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // ADD user from payload
        req.user = decoded;
        next();
    } catch(e){
        res.status(400).json({msg: "Token is not valid"})
    }
}

module.exports = auth;