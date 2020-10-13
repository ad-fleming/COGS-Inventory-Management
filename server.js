// Dependencies
const express = require("express");
const exphbs= require("express-handlebars");
const handlebars = require ("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");


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

// ROUTES WILL GO HERE
// *******************

//  VIEWS
app.get("/", (req, res) =>  {
  res.render("index");
});

// API
app.get("/api/config",)

// THIS ONE DROPS THE TABLES
// db.sequelize.sync({force:true}).then(function() {
// THIS ONE DOESN'T DROP TABLES
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
      console.log(`Server listening on http://localhost:${PORT}`)
    });
  });