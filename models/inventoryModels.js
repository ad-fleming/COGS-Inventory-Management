
module.exports = function(sequelize, Datatypes){

    const item = sequelize.define("inventory_item",  {
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
    item.associate = function (models){
        item.belongsToMany(models.user, {
            through: "useritem"
            foreignKey: "itemId"
        })
    }

    return item


    // trying to push this change