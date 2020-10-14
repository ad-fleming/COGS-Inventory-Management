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
    },{
        timestamps: false,            
    });
    User.associate = function (models){
        User.hasMany(models.Inventory, {
            onDelete: "Cascade"
        });
    }
    return User
}

