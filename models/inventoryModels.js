
module.exports = function(sequelize, Datatypes){

    const Inventory_item = sequelize.define("inventory_item",  {
        unit_count:{
            type: DataTypes.INTEGER,   // change to decimal?
            allowNull: false
        },  
        item_count:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        total_value:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        inventory_date:{               // possibly replace with measurement?
            type: DataTypes.DATE,
            allowNull: false
        },
    },{
        timestamps: false,            // CAN REMOVE once not using seed data
    });
    Inventory_item.associate = function (models){
        Inventory_item.belongsToMany(models.user, {
            through: "useritem",
            foreignKey: "itemId"
        })
    }

    return Inventory_item
}

    // trying to push this change