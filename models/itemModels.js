//  INITIAL INVENTORY CREATION
module.exports = function(sequelize, Datatypes){

    const Item = sequelize.define("Item",  {
        unit_name:{
<<<<<<< HEAD
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
=======
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
>>>>>>> 264d9b60a69ab24ed57cbc22be733682d0fc6e89
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
<<<<<<< HEAD
            through: "useritem"
            foreignKey: "itemId"
        })
    }
=======
            through: "useritem",
            foreignKey: "itemId"
        })
    }

>>>>>>> 264d9b60a69ab24ed57cbc22be733682d0fc6e89
    return Item

}
