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

        