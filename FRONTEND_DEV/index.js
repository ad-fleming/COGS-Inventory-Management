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
