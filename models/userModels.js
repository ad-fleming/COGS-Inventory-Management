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
    inventory_id: {
        type: Datatypes.INTEGER,
        allowNull: true},
    },{
        timestamps: false,            
    });
    // User.associate = function (models){
    //     User.hasOne(models.Item, {
    //         onDelete: "Cascade"
    //     });
    // }
    return User
}

