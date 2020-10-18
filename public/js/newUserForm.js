$(document).ready(function()    {
console.log("I'm the new user form js!")

// GLOBAL BUTTON
const newUserBtn = $("#user-create-button");

// CREATE A NEW USER & INITIAL INVENTORY


newUserBtn.on("click", function (event) {
    console.log("I've been clicked")
    const newUserInfo = {
      account_name: $("#account-name").val().trim(),
      email: $("#email").val().trim(),
      name: $("#name").val().trim(),
      password: $("#password").val().trim(),
    };
    let stringifiedUser = JSON.stringify(newUserInfo);
    newUserCreate(stringifiedUser);
    window.location.replace(`/mainsheet/`)
  })










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








})

