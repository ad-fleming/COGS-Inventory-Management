module.exports = function(sequelize, DataTypes){
    const User = sequelize.define("User",  {
    account_name: {
        type: Dataypes.STRING,
        allowNull: false},
    email: {
        type: Dataypes.STRING,
        allowNull: false},
    name: {
        type: Dataypes.STRING,
        allowNull: false},
    password: {
        type: Dataypes.STRING,
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

