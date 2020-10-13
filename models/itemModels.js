//  INITIAL INVENTORY CREATION
module.exports = function(sequelize, Datatypes){

    const Item = sequelize.define("Inventory_item",  {
        unit_name:{
            type: Sequelize.STRING,
            allowNull: false
        }, 
        unit_category:{
            type: Sequelize.STRING,
            allowNull: false
        }, 
        unit_distributor:{
            type: Sequelize.STRING,
            allowNull: false
        },
        unit_price:{
            type: Sequelize.INTEGER,   // change to decimal?
            allowNull: false
        },  
        unit_par:{
            type: Sequelize.DECIMAL (10,2),
            allowNull: true
        },
        items_per_unit:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item_count_type:{               // possibly replace with measurement?
            type: Sequelize.STRING,
            allowNull: false
        },
        item_count_par:{
            type: Sequelize.INTEGER,
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
        Item.belongsToMany(models.user, {
            through: "useritem"
            foreignKey: "itemId"
        })
    }

    return Item

}
