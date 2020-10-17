
module.exports = function(sequelize, Datatypes){

    const Inventory = sequelize.define("Inventory",  {
        id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV1,
            primaryKey: true
        },
        inventory_date:{               // possibly replace with measurement?
            type: Datatypes.DATEONLY,
            allowNull: false
        },
        // items_id:{               
        //     type: Sequelize.INTEGER,         this is necessary as seed data
        //     allowNull: false
        // },
    },{
        timestamps: false,            // CAN REMOVE once not using seed data
    });
    Inventory.associate = function (models){
        Inventory.hasMany(models.Item);
    };
    return Inventory;
}
