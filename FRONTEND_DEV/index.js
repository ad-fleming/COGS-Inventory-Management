$("#loginButton").on("click", function(event) {
    event.preventDefault();
  
    // Make a newChirp object
    var login = {
      login: $("#loginButton").val().trim(),
    };
  
    console.log(login);})

    $("#userButton").on("click", function(event) {
        event.preventDefault();
      
        // Make a newChirp object
        var user = {
          user: $("#userButton").val().trim(),
        };
      
        console.log(user);})


        $("#submitButton").on("click", function(event) {
            event.preventDefault();

            var loginInfo = {
                Name: $("#name").val().trim(),
                Account_Name: $("#account-name").val().trim(),
                Email: $("#email").val().trim(),
                Password: $("#password").val().trim(),
                
              };
            
              console.log(loginInfo);

            })
