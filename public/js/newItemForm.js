$(document).ready(function()    {
    console.log("I'm the new item form js!")

    // button targets
    const addItemBtn = $("#add-item-button");


    
  // NEW ITEM CREATE
  addItemBtn.on("click", function (event) {
    console.log("i've been clicked")
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
      $.ajax({
      url: `/api/addToMain"`,
      method: "POST",
      data: {
        unit_name,
        unit_category,
        unit_distributor,
        unit_price,
        unit_par,
        items_per_unit,
        item_count_type,
        item_count_par,
        unit_count,
        item_count
      }, 
  }).then((response)    =>  {
    console.log(responsse)
  })
  })







})