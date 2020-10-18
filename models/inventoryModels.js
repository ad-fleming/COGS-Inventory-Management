
module.exports = function(sequelize, Datatypes){

    const Inventory = sequelize.define("Inventory",  {
        inventory_date:{               // possibly replace with measurement?
            type: Datatypes.DATEONLY,
            allowNull: false
        },
    },{
        timestamps: false,            // CAN REMOVE once not using seed data
    });
    Inventory.associate = function (models){
        Inventory.hasMany(models.Item);
    };
    return Inventory;
}

// For better or worse