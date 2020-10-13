module.exports = function(sequelize, Datatypes){
    const User = sequelize.define("User",  {
    account_name: {
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
    },{
        timestamps: false,            
    });
    User.associate = function (models){
        User.belongsToMany(models.Inventory_item, {
            through:"Item",             // <----------- be careful to call this whatever is being exported (ESPECIALLY WHEN DIFFERENT FROM MODEL FILE NAME)
            foreignKey: "item_id"
        });
    }
    return User
}

