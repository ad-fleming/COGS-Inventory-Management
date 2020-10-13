//  INITIAL INVENTORY CREATION
module.exports = function(sequelize, Datatypes){

    const Item = sequelize.define("Item",  {
        unit_name:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        unit_category:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        unit_distributor:{
            type: DataTypes.STRING,
            allowNull: false
        },
        unit_price:{
            type: DataTypes.INTEGER,   // change to decimal?
            allowNull: false
        },  
        unit_par:{
            type: DataTypes.DECIMAL (10,2),
            allowNull: true
        },
        items_per_unit:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        item_count_type:{               // possibly replace with measurement?
            type: DataTypes.STRING,
            allowNull: false
        },
        item_count_par:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // users_id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: true},
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
