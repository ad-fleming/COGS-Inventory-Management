$(document ).ready(function() {
    console.log( "ready!" );

// global button targetting
const newUserBtn = $("#submitButton");
const newItemFrm = $("#new-item-form");
const loginBtn = $("#loginButton")
const addItemBtn = $("#add-item-button");
const newUserItemBtn =  $("#newUserCreateItems");
const mainInventoryBtn = $("#finished-item")
const cardTextTop = $("#card-text-top")
const mainSheetNav  = $("#main-sheet-nav");


// local storage access
let safeUser = localStorage.getItem("safeUser");
let passkey = localStorage.getItem("passKey")

// global functions

function goToMainInventory()    {
  console.log("is this happening?")
  passkey = localStorage.getItem("passKey")
  $.ajax({
    url:`/test`,
    method: "GET",
    headers: {
      "x-auth-token": passkey
    },
  }).then((response) =>   {
    mainItemsArray = response.Items
    console.log(mainItemsArray)
    rowTopTarget.empty();
    rowLowTarget.empty();
    cardTextTop.text("Main Item Sheet")
    let mainItemForm = $("<form>");
    mainItemForm.addClass("white-text logo push");
    mainItemForm.attr("id", "add-item-form")
    mainItemForm.text("hello again")
    rowTopTarget.append(mainItemForm)
    
    if (mainItemsArray)  {
      
      for(var i = 0; i < mainItemsArray.length; i++)  {
      let itemName = $("<h4>");
      itemName.text(mainItemsArray[i].unit_name + " - " + mainItemsArray[i].unit_category);
      itemName.attr("data-type", mainItemsArray[i].name)
      mainItemForm.append(itemName);

      let divItemRow = $("<div>");
      divItemRow.addClass("row section form-section")
      mainItemForm.append(divItemRow);
      
      let divItemColLeft = $("<div>").addClass("col s6 l6");
      divItemRow.append(divItemColLeft);

      let pDistributor = $("<p>");
      pDistributor.text("Distributor");
      divItemColLeft.append(pDistributor);

      let distInput = $("<input>");
      distInput.addClass("input-field form-text");
      distInput.attr("value", mainItemsArray[i].unit_distributor);
      divItemColLeft.append(distInput);

      let pUnitPrice = $("<p>");
      pUnitPrice.text("Unit Price");
      divItemColLeft.append(pUnitPrice);
      
      let unitPriceInput = $("<input>");
      unitPriceInput.addClass("input-field form-text");
      unitPriceInput.attr("value", mainItemsArray[i].unit_price);
      divItemColLeft.append(unitPriceInput);

      let pItemCountType = $("<p>");
      pItemCountType.text("Item Count Type");
      divItemColLeft.append(pItemCountType);

      let itemCountTypeInput = $("<input>");
      itemCountTypeInput.addClass("input-field form-text");
      itemCountTypeInput.attr("value", mainItemsArray[i].item_count_type);
      divItemColLeft.append(itemCountTypeInput);

      let divItemColRight = $("<div>").addClass("col s6 l6")
      divItemRow.append(divItemColRight);

      let pUnitPar = $("<p>");
      pUnitPar.text("Unit Par");
      divItemColRight.append(pUnitPar);

      let unitParInput = $("<input>");
      unitParInput.addClass("input-field form-text");
      unitParInput.attr("value", mainItemsArray[i].unit_par);
      divItemColRight.append(unitParInput);

      let pItemPar = $("<p>");
      pItemPar.text("Item Par");
      divItemColRight.append(pItemPar);

      let itemParInput = $("<input>");
      itemParInput.addClass("input-field form-text");
      itemParInput.attr("value", mainItemsArray[i].item_count_type);
      divItemColRight.append(itemParInput);

      let pItemsPerUnit = $("<p>");
      pItemsPerUnit.text("Items Per Unit");
      divItemColRight.append(pItemsPerUnit);
      
      let itemsPerInput = $("<input>");
      itemsPerInput.addClass("input-field form-text");
      itemsPerInput.attr("value", mainItemsArray[i].items_per_unit);
      divItemColRight.append(itemsPerInput);

    }
  } else {
    console.log("items array is not greater than 0")
  }

  })
}

// MAIN INVENTORY BUTTON
mainInventoryBtn.on("click", function(event)  {
    goToMainInventory();
})

mainSheetNav.on("click", function(event)  {
  goToMainInventory();
})

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
        }).then(function (data) {
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })

      })
    }
  }

  // LOGIN USER

  function loginUser(stringifiedLoginUser) {
    $.ajax({
      url: `/api/auth`,
      method: "POST",
      data: {
        email: $("#loginEmail").val().trim(),
        password: $("#loginPassword").val().trim()
      }, 
    }).then((response)=>{
      console.log(response);
      let passKey = response.token
      localStorage.setItem("passKey", passKey);
      $.ajax({
        url:`/newItem`,
        method: "GET",
        headers: {
          "x-auth-token": passkey
        }
      }).then((response)=>{
        window.location.replace("/newItem")
      })
      // safeUser = response.id
      // localStorage.setItem("safeUser", safeUser);
    })
    
  }

  loginBtn.on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    const loginUserInfo = {
      email: $("#loginEmail").val().trim(),
      password: $("#loginPassword").val().trim(),
    };
    let stringifiedLoginUser = JSON.stringify(loginUserInfo);
    loginUser();
  })

  // newUserBtn.on("click", function (event) {
  //   event.preventDefault();
  //   const newUserInfo = {
  //     account_name: $("#account-name").val().trim(),
  //     email: $("#email").val().trim(),
  //     name: $("#name").val().trim(),
  //     password: $("#password").val().trim(),
  //   };
  //   let stringifiedUser = JSON.stringify(newUserInfo);
  //   newUserCreate(stringifiedUser);
  // })


  // TAKE NEW USER TO ITEM CREATE PAGE

  newUserItemBtn.on("click", (event)=>{
    event.preventDefault();
    newUserItemPage();
  })

  function newUserItemPage(){
    $.ajax({
      url:`/newItem`,
      method: "GET",
      headers: {
        "x-auth-token": passkey
      }
    }).then((response)=>{
      window.location.replace("/newItem")
    })
  }

  // ADDING ITEM TO MASTER INVENTORY 
  function newItemCreate(stringifiedItem){
    postedItem = $.ajax({
      url: "/api/addToMaster",
      method: "POST",
      headers:{
        "x-auth-token": passkey
      },
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
    }).then((response) => {
      window.location.reload();
    }).catch((err) => {
      console.log(err)
    })
    return postedItem
  }

  // async function getInventoryId(safeUser) {
  //   console.log("did getInventoryId happen?")
  //   console.log(safeUser)
  //   try {
  //     const inventory = await $.ajax({
  //       url: `/user/${safeUser}/inventory/?date=0001-01-01`,
  //       method: "GET"
  //     })
  //     console.log(inventory)
  //     return inventory
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // CLICK EVENTS

  // Create New User // Tied to NewUserForm.handlebars
  newUserBtn.on("click", function (event) {
    event.preventDefault();
    const newUserInfo = {
      account_name: $("#account-name").val().trim(),
      email: $("#email").val().trim(),
      name: $("#name").val().trim(),
      password: $("#password").val().trim(),
    };
    let stringifiedUser = JSON.stringify(newUserInfo);
    newUserCreate(stringifiedUser);
  })

// I'm HERE ====================================
  loginBtn.on("click",(event)=>{
    event.preventDefault();
    // const userToLoginInfo = {
    //   email: $("#loginEmail").val().trim(),
    //   password: $("#loginPassword").val().trim()
    // }
    // let stringifiedUserToLogin = JSON.stringify(userToLoginInfo);
    
    // loginUser(stringifiedUserToLogin);
    loginUser();
  })

  // NEW ITEM CREATE
  addItemBtn.on("click", function (event) {
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
    };
    console.log(newItemInfo);
    let stringifiedItem = JSON.stringify(newItemInfo);
    newItemCreate(stringifiedItem);

  })


  $("#updateButton").on("click", function (event) {
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

  // $("#finalizeButton").on("click", function (event) {
  //   event.preventDefault();

  //   var Finalize = {
  //     Finalize: $("#finalizeButton")
  //   };

  //   console.log(Finalize);

  // })





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
