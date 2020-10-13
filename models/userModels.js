module.exports = function(sequelize, Datatypes){
    const User = sequelize.define("User",  {
    account_name: {
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
    },{
        timestamps: false,            
    });
    User.associate = function (models){
        User.hasOne(models.Item, {
            onDelete: "Cascade"
        });
    }
    return User
}

