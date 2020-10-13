
module.exports = function(sequelize, Datatypes){

    const inventory_item = sequelize.define("inventory_item",  {
        unit_count:{
            type: Sequelize.INTEGER,   // change to decimal?
            allowNull: false
        },  
        item_count:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        total_value:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        inventory_date:{               // possibly replace with measurement?
            type: Sequelize.DATE,
            allowNull: false
        },
    },{
        timestamps: false,            // CAN REMOVE once not using seed data
    });
    inventory_item.associate = function (models){
        inventory_item.belongsToMany(models.user, {
            through: "useritem"
            foreignKey: "itemId"
        })
    }

    return inventory_item


    // trying to push this change