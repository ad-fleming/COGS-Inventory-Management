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
        timestamps: false,            // CAN REMOVE once not using seed data
    });
    User.associate = function (models){
        User.belongsToMany(models.item, {
            through:"userItem",// <----------- be careful to call this whatever is being exported (ESPECIALLY WHEN DIFFERENT FROM MODEL FILE NAME)
            foreignKey: "userId"
        });
    }
    return User
}

