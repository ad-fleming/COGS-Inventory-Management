
module.exports = function(sequelize, Datatypes){

    const inventory = sequelize.define("inventory_item",  {
        unit_count:{
            type: Sequelize.INTEGER,
            allowNull: false
        }, 
        item_count:{
            type: Sequelize.INTEGER,
            allowNull: false
        }, 
        total_value:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        inventory_date:{
            type: Sequelize.DATE,
            allowNull: false
        },  
    },{
        timestamps: false,         
    });
    return item

}
