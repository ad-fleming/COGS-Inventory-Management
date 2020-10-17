// const db = require("../../models");
// const { query } = require("express");

$(document ).ready(function() {
    console.log( "ready!" );

// global button targetting
const newUserBtn = $("#submitButton")
const newItemFrm = $("#new-item-form")

// global variable
let safeUser = "" // initial inventory id
// global functions

// CREATE A NEW USER & // INITIAL INVENTORIES
async function newUserCreate(stringifiedUser)  {
 {$.ajax({
    url: "/api/users",
    method: "POST",
    data: {
      account_name: $("#account-name").val().trim(),  
      name: $("#name").val().trim(),
      password: $("#password").val().trim(),
      email: $("#email").val().trim(),
    },  
  }).then(function(response)  {
    let passKey = response.token
    const safeUser = response.user.id;
    localStorage.setItem("safeUser", safeUser)
    localStorage.setItem("passKey", passKey);
    $.ajax({
          url: `/api/inventory`,
          method: "POST",
          data: {
          UserId: safeUser,
          inventory_date: "0001-01-01"
          },
        }).then(function(data)  {
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })
      })
    }
  }

// ADDING ITEMS TO INITIAL INVENTORY


// CLICK EVENTS

// Create New User // Tied to NewUserForm.handlebars
      newUserBtn.on("click", function(event) {
        event.preventDefault();
        const newUserInfo = {
            account_name: $("#account-name").val().trim(),  
            email: $("#email").val().trim(),
            name: $("#name").val().trim(),
            password: $("#password").val().trim(),
          };
        // console.log(newUserInfo);
        let stringifiedUser = JSON.stringify(newUserInfo);
        // console.log(stringifiedUser);
        newUserCreate(stringifiedUser);
        })

// NEW ITEM CREATE
      

        $("#newItemCreate").on("click", function(event) {
          event.preventDefault();

        var newItemForm = {
            Name_of_Item: $("#name-of-item").val().trim(),
            Category: $("#category").val().trim(),
            Distributor: $("#distributor").val().trim(),
            Unit_Price: $("#unit-price").val().trim(),
            Unit_Par: $("#unit-par").val().trim(),
            Items_Per_Unit: $("#items-per-unit").val().trim(),
            Item_count_type: $("#item-count-type").val().trim(),
            Item_count_par: $("#item-count-par").val().trim(),
            
        };
        console.log(newItemForm);
        })

        $("#Finished").on("click", function(event) {
          event.preventDefault();

          var Finished= {
            Finished: $("#Finished")
          };

          console.log(Finished);

        }) 

        $("#updateButton").on("click", function(event) {
          event.preventDefault();

        var updateForm = {
          Unit_Distributor: $("#distributor").val().trim(),
          Unit_Par: $("#unit-par").val().trim(),
          Unit_Price: $("#unit-price").val().trim(),
          Items_Per_Unit: $("#items-per-unit").val().trim(),
          Item_count_type: $("#item-count-type").val().trim(),
          Item_par: $("#item-par").val().trim(),
          Unit_Count: $("#unit-count").val().trim(),
          Item_count: $("#item-count").val().trim(),
            Total_Value: $("#total-value").val().trim(),
            Inventory_id: $("#inventory-id").val().trim(),
            
          };
        
          console.log(updateForm);

        })

        $("#finalizeButton").on("click", function(event) {
          event.preventDefault();

          var Finalize= {
            Finalize: $("#finalizeButton")
          };

          console.log(Finalize);

        }) 





})

//      ${id of the button}.on("click",)
//      AJAX call >>>> accessing API for this information
//      user // inventory 1 // category // array of items
//      ${id of form//holder div}   
//      dynamically generate button items
//      each of those button items also has an id

// $("#loginButton").on("click", function(event) {
//     event.preventDefault();
  
//     // Make a newChirp object
//     var login = {
//       login: $("#loginButton").val().trim(),
//     };
  
//     console.log(login);})

//     $("#userButton").on("click", function(event) {
//         event.preventDefault();
      
//         // Make a newChirp object
//         var user = {
//           user: $("#userButton").val().trim(),
//         };
      
//         console.log(user);})
