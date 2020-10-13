
module.exports = function(sequelize, Datatypes){

    const Inventory_item = sequelize.define("inventory_item",  {
        unit_count:{
            type: Datatypes.INTEGER,   // change to decimal?
            allowNull: false
        },  
        item_count:{
            type: Datatypes.INTEGER,
            allowNull: true
        },
        total_value:{
            type: Datatypes.INTEGER,
            allowNull: false
        },
        inventory_date:{               // possibly replace with measurement?
            type: Datatypes.DATE,
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
        Inventory_item.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
    return Inventory_item
}
