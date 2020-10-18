// THIS IS MIDDLE WARE FOR AUTHENTICATING USER TOKEN
const config = require('config');
const jwt = require('jsonwebtoken');
const jwtSecret = "tesT_sEcrET"

// This function grabs the token that is being sent from the Frontend and authenticates it


// function auth(req, res, next){
//     const authHeader = req.headers['authorization'];

//     console.log("this is hitting")
//     const token = authHeader && authHeader.split(" ")[1];
//     console.log(token);

//     // CHECK FOR TOKEN
//     if(!token){
//         console.log("inside if check")
//         // IF NO TOKEN, RETURN YOU DON'T HAVE CORRECT PERMISSIONS (UNAUTHORIZED STATUS)
//         return res.status(401).json({msg: "No token present, authorization denied"})
//     }

//     try{
//         // verify token
//         const decoded = jwt.verify(token, jwtSecret);
//         // ADD user from payload
//         req.user = decoded;
//         console.log(req.user)
//         next();
//     } catch(e){ //<--- catch (e)xception
//         return res.status(400).json({msg: "Token is not valid"})
//     }
// }

// function auth(req, res, next){
//     const authHeader = req.headers['authorization'];
//     // If there is an authHeader, split it and return token
//     // Otherwise return as undefined
//     const token = authHeader && authHeader.split(" ")[1];
//     if (token == null) return res.json({msg: "no token present"})

//     jwt.verify(token, jwtSecret, (err, user)=>{
//         if(err) return res.json({msg: "Invalid Token"});
//         req.user = user
//         next();
//     })
// }

// function auth(req, res, next){
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined'){
//         // Split at the space 'bearer token'
//         const bearer = bearerHeader.split(" "); //--- splits 'bearer token' to [bearer, token]
//         // get token from array
//         const bearerToken = bearer[1];
//         // set the token
//         req.token = bearerToken
//         // Next middleware
//         next();
//     } else {
//         // Forbidden
//         res.sendStatus(403);
//     }

//     jwt.verify(token, jwtSecret, (err, user) =>{
//         if(err) return res.json({msg: "Invalid Token"});
//         req.user = user
//     })
// }

// let auth = (req, res, next) => {
//   let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
//   if (token.startsWith('Bearer ')) {
//     // Remove Bearer from string
//     token = token.slice(7, token.length);
//   }

//   if (token) {
//     jwt.verify(token, jwt, (err, decoded) => {
//       if (err) {
//         return res.json({
//           success: false,
//           message: 'Token is not valid'
//         });
//       } else {
//         req.decoded = decoded;
//         console.log(req.decoded)
//         next();
//       }
//     });
//   } else {
//     return res.json({
//       success: false,
//       message: 'Auth token is not supplied'
//     });
//   }
// };

function auth(req, res, next){
    const token = req.header('x-auth-token');
    // Check for token
    if(!token) {
        res.status(401).json({msg: "No Token"})
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
            // Add user form payload
            req.user = decoded;
            next();
    }
    catch(e){
        res.status(400).json({msg: "invalid token"})
    }
    

}


module.exports = auth;

//================================
// NOW WHEN WE WANT TO PROTECT A ROUTE:
// 1) WE IMPORT AUTH TO CONTROLLER FILE
// 2) CALL AUTH AS THE SECOND PARAMETER OF THE ROUTE ENDPOINT