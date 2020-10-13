
module.exports = function(sequelize, Datatypes){

    const Inventory_item = sequelize.define("Inventory_item",  {
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
        inventory_date:{               
            type: Sequelize.DATE,
            allowNull: false
        },
        // items_id:{               
        //     type: Sequelize.INTEGER,         this is necessary as seed data
        //     allowNull: false
        // },
    },{
        timestamps: false,            // CAN REMOVE once not using seed data
    });
    Inventory_item.associate = function (models){
        Inventory_item.belongsToMany(models.user, {
            through: "useritem"
            foreignKey: "itemId"
        })
    }

    return Inventory_item


    // trying to push this change