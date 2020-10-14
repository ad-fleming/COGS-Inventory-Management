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
        UserId: {
            type: Datatypes.INTEGER,
            allowNull: true},
        // inventory_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: true},
    },{
        timestamps: false,            // CAN REMOVE once not using seed data
    });
    Item.associate = function (models){
        Item.hasMany(models.Inventory_item), 
        Item.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            }
        })
    }
    return Item
}
