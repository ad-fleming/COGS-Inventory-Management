//  INITIAL INVENTORY CREATION
module.exports = function(sequelize, Datatypes){

    const Item = sequelize.define("Item",  {
        unit_name:{
            type: Datatypes.STRING,
            allowNull: false
        }, 
        unit_category:{
            type: Datatypes.STRING,
            allowNull: false
        }, 
        unit_distributor:{
            type: Datatypes.STRING,
            allowNull: false
        },
        unit_price:{
            type: Datatypes.INTEGER,   // change to decimal?
            allowNull: false
        },  
        unit_par:{
            type: Datatypes.DECIMAL (10,2),
            allowNull: true
        },
        items_per_unit:{
            type: Datatypes.INTEGER,
            allowNull: false
        },
        item_count_type:{               // possibly replace with measurement?
            type: Datatypes.STRING,
            allowNull: false
        },
        item_count_par:{
            type: Datatypes.INTEGER,
            allowNull: false
        },
        unit_count:{
            type: Datatypes.INTEGER,   // change to decimal?
            allowNull: true,
            defaultValue: 0
        },  
        item_count:{
            type: Datatypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        total_value:{
            type: Datatypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
    },{
        timestamps: false,            // CAN REMOVE once not using seed data
    });
    Item.associate = function (models){
        Item.belongsTo(models.Inventory, {
            through: models.User
        }) 
    }
    return Item
}
