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

            
            $("#updateInventory").on("click", function(event) {
              event.preventDefault();

              var updateInventory={
                Update_Inventory: $("#finalizeButton")
              };
              console.log(updateInventory);

            }) 
            
            
            $("#category1").on("click", function(event) {
              event.preventDefault();

              var category1={
                Category1: $("#category1")
              };
              console.log(category1);

            }) 

            $("#category2").on("click", function(event) {
              event.preventDefault();

              var category2={
                Category2: $("#category1")
              };
              console.log(category2);

            }) 

            $("#category3").on("click", function(event) {
              event.preventDefault();

              var category3={
                Category3: $("#category3")
              };
              console.log(category3);

            }) 

            $("#category4").on("click", function(event) {
              event.preventDefault();

              var category4={
                Category4: $("#category4")
              };
              console.log(category4);

            }) 


            $("#item1").on("click", function(event) {
              event.preventDefault();

              var item1={
                Item1: $("#item1")
              };
              console.log(item1);

            }) 


            $("#item2").on("click", function(event) {
              event.preventDefault();

              var item2={
                Item2: $("#item2")
              };
              console.log(item2);

            }) 


            $("#item3").on("click", function(event) {
              event.preventDefault();

              var item3={
                Item3: $("#item3")
              };
              console.log(item3);

            }) 


            $("#item4").on("click", function(event) {
              event.preventDefault();

              var item4={
                Item4: $("#item1")
              };
              console.log(item4);

            }) 


            $("#item5").on("click", function(event) {
              event.preventDefault();

              var item5={
                Item5: $("#item5")
              };
              console.log(item5);

            }) 


            $("#item6").on("click", function(event) {
              event.preventDefault();

              var item6={
                Item6: $("#item6")
              };
              console.log(item6);

            }) 

            $("#item7").on("click", function(event) {
              event.preventDefault();

              var item7={
                Item7: $("#item7")
              };
              console.log(item7);

            }) 


            $("#item8").on("click", function(event) {
              event.preventDefault();

              var item8={
                Item8: $("#item8")
              };
              console.log(item8);

            }) 


            $("#item9").on("click", function(event) {
              event.preventDefault();

              var item9={
                Item9: $("#item9")
              };
              console.log(item9);

            }) 




            
            
            
            
            
            
            
            $("#updateInventory").on("click", function(event) {
              event.preventDefault();

              var updateInventory={
                Update_Inventory: $("#finalizeButton")
              };
              console.log(updateInventory);

            }) 
