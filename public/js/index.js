// const db = require("../../models");
// const { query } = require("express");

$(document ).ready(function() {
    console.log( "ready!" );

// global button targetting
const newUserBtn = $("#submitButton");
const newItemFrm = $("#new-item-form");
const addItemBtn = $("#add-item-button");

// local storage access
let safeUser = localStorage.getItem("safeUser");
console.log(safeUser);

// global functions

// Did it work?

// CREATE A NEW USER & // INITIAL INVENTORIES
function newUserCreate(stringifiedUser)  {
 {$.ajax({
    url: "/api/users",
    method: "POST",
    data: {
      account_name: $("#account-name").val().trim(),  
      name: $("#name").val().trim(),
      password: $("#password").val().trim(),
      email: $("#email").val().trim(),
    },  
  }).then((response) =>  {
    window.location.replace(`/users/welcome/${response.user.id}`)
    let passKey = response.token
    safeUser = response.user.id;
    localStorage.setItem("safeUser", safeUser);
    localStorage.setItem("passKey", passKey);
    $.ajax({
          url: `/api/inventory`,
          method: "POST",
          data: {
          UserId: safeUser,
          inventory_date: "0001-01-01",
          id: safeUser
          },
        }).then(function(data)  {
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })
        // $.ajax({
        //   url: `users/welcome/${safeUser}`,
        //   method: "GET",
        // }).then((data)=>{
        // console.log("THIS WHERE THE GIANT HTML BLOCK IS WORKING, BUT WE'RE NOT GOING ANYWHERE")
        // }).catch((err)=>console.log(err))

      })
    }
  }

// ADDING ITEM TO INITIAL INVENTORY
function newItemCreate(stringifiedItem) {
  {$.ajax({
    url: "/api/items/",
    method: "POST",
    data: {
      unit_name: $("#name-of-item").val().trim(),
      unit_category: $("#category").val().trim(),
      unit_distributor: $("#distributor").val().trim(),
      unit_price: $("#unit-price").val().trim(),
      unit_par: $("#unit-par").val().trim(),
      items_per_unit: $("#items-per-unit").val().trim(),
      item_count_type: $("#item-count-type").val().trim(),
      item_count_par: $("#item-count-par").val().trim(),
    },
  }).then((userData) => {
    console.log(userData)
    console.log(safeUser)
    $.ajax({
      url:  `/api/inventory/user/${safeUser}`,
      method: "GET"
    }).then((data)  =>  {
      console.log("---------")
      console.log(data)
    }).catch((err)  =>  {
      console.log
    })
  }).catch((err) => {
    console.log(err)
  })
}
}

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
        console.log(stringifiedUser + "index.js line 107")
        
        })

// NEW ITEM CREATE
        addItemBtn.on("click", function(event) {
        event.preventDefault();
        var newItemInfo = {
            productName: $("#name-of-item").val().trim(),
            productCategory: $("#category").val().trim(),
            productDistributor: $("#distributor").val().trim(),
            unitPrice: $("#unit-price").val().trim(),
            unitPar: $("#unit-par").val().trim(),
            itemsPerUnit: $("#items-per-unit").val().trim(),
            itemCountType: $("#item-count-type").val().trim(),
            itemCountPar: $("#item-count-par").val().trim(),
            UserId: safeUser
        };
        console.log(newItemInfo);
        let stringifiedItem = JSON.stringify(newItemInfo)
        newItemCreate(stringifiedItem)
        })

        $("#finished").on("click", function(event) {
          event.preventDefault();
          var Finished= {
            Finished: $("#finished")
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
