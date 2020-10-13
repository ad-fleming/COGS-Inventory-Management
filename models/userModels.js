module.exports = function(sequelize, Datatypes){
    const User = sequelize.define("User",  {
    account_name: {
<<<<<<< HEAD
        type: DataTypes.STRING,
        allowNull: false},
    email: {
        type: DataTypes.STRING,
        allowNull: false},
    name: {
        type: DataTypes.STRING,
        allowNull: false},
    password: {
        type: DataTypes.STRING,
        allowNull: false},
    inventory_id: {
        type: DataTypes.INTEGER,
        allowNull: true},
=======
        type: Datatypes.STRING,
        allowNull: false},
    email: {
        type: Datatypes.STRING,
        allowNull: false},
    name: {
        type: Datatypes.STRING,
        allowNull: false},
    password: {
        type: Datatypes.STRING,
        allowNull: false},
    // items_id: {
    //     type: Sequelize.INTEGER,             this is necessary as a seed
    //     allowNull: true},
>>>>>>> 264d9b60a69ab24ed57cbc22be733682d0fc6e89
    },{
        timestamps: false,            
    });
    User.associate = function (models){
<<<<<<< HEAD
        User.belongsToMany(models.item, {
            through:"userItem",// <----------- be careful to call this whatever is being exported (ESPECIALLY WHEN DIFFERENT FROM MODEL FILE NAME)
            foreignKey: "userId"
=======
        User.belongsToMany(models.Inventory_item, {
            through:"Item",             // <----------- be careful to call this whatever is being exported (ESPECIALLY WHEN DIFFERENT FROM MODEL FILE NAME)
            foreignKey: "item_id"
>>>>>>> 264d9b60a69ab24ed57cbc22be733682d0fc6e89
        });
    }
    return User
}

