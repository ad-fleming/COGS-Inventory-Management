// Dependencies
const express = require("express");
const exphbs= require("express-handlebars");
const handlebars = require ("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const itemController = require("./controllers/itemController");
const userController = require("./controllers/userController");
const inventoryController = require("./controllers/inventoryController");
const authController = require("./controllers/authController");
const session = require("express-session");
const auth = require("./middleware/auth");
// const cookieParser = require ("cookie-parser");
// Sets up the Express APP 
// =======================

const app = express();
const PORT = process.env.PORT || 8080;

// Requiring models for syncing
const db = require ("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Static Directory
app.use(express.static("public"));


// Include Express-handlebars as the default templating engine
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars),
}));
app.set("view engine", "handlebars");

// app.use(cookieParser);

// app.use(session({
//   secret: "thanksphil",
//   resave: true,
//   saveUninitialized: true
// }));

// ROUTES WILL GO HERE
// *******************

//  VIEWS
app.get("/", (req, res) =>  {
  res.render("index");
});

app.get("/newUserForm", (req, res) =>  {
  res.render("newUserForm");
});

app.get("/newUser", (req, res) =>  {
  console.log(req.session)
  res.render("newUser");
});

app.get("/newItem", (req, res) =>  {
  res.render("newItem");
});

app.get("/login", (req, res) =>  {
  res.render("login");
});

// app.get("/mainInventory/:id",(req,res)=>{
//   res.render("mainInventory");

//   // db.Inventory.findOne({
//   //   UserId: req.params.id
//   // }).then((masterInventory)=>{
//   //   db.Item.findAll({
//   //     where:{
//   //       InventoryId: masterInventory.id
//   //     }
//   //   }).then((masterInventoryItems)=>{
//   //     res.render("mainInventory", {masterInventoryItems})
//   //   }).catch((err)=>{
//   //     console.log(err)
//   //   })
//   // }).catch((err)=>{
//   //   console.log(err)
//   // })
  
// })

app.use(userController);
app.use(itemController);
app.use(inventoryController);
app.use(authController);

// API
app.get("/api/config",(req, res)  =>  {
  res.json({
    success: true,
  })
})

// THIS ONE DROPS THE TABLES
// db.sequelize.sync({force:true}).then(function() {
// THIS ONE DOESN'T DROP TABLES
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
      console.log(`Server listening on http://localhost:${PORT}`)
    });
  });