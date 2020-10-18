// THIS IS MIDDLE WARE FOR AUTHENTICATING USER TOKEN
const config = require('config');
const jwt = require('jsonwebtoken');
const jwtSecret = "tesT_sEcrET"

// This function grabs the token that is being sent from the Frontend and authenticates it


function auth(req, res, next){
    console.log("this is hitting")
    const token = req.header ['authorization'];
    console.log(token);

    // CHECK FOR TOKEN
    if(!token){
        console.log("inside if check")
        // IF NO TOKEN, RETURN YOU DON'T HAVE CORRECT PERMISSIONS (UNAUTHORIZED STATUS)
        return res.status(401).json({msg: "No token present, authorization denied"})
    }

    try{
        // verify token
        const decoded = jwt.verify(token, jwtSecret);
        // ADD user from payload
        req.user = decoded;
        console.log(req.user)
        next();
    } catch(e){ //<--- catch (e)xception
        return res.status(400).json({msg: "Token is not valid"})
    }
}

// function auth(req, res, next){
//     const authHeader = req.headers['authorization'];
//     // If there is an authHeader, split it and return token
//     // Otherwise return as undefined
//     const token = authHeader && authHeader.split(" ")[1];
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, jwtSecret, (err, user)=>{
//         if(err) return res.sendStatus(403);
//         req.user = user
//         next();
//     })
// }

module.exports = auth;

//================================
// NOW WHEN WE WANT TO PROTECT A ROUTE:
// 1) WE IMPORT AUTH TO CONTROLLER FILE
// 2) CALL AUTH AS THE SECOND PARAMETER OF THE ROUTE ENDPOINT