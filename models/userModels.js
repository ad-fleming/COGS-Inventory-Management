module.exports = function(sequelize, Datatypes){
    const user = sequelize.define("User",  {
    account_name: {
        type: Sequelize.STRING,
        allowNull: false},
    email: {
        type: Sequelize.STRING,
        allowNull: false},
    name: {
        type: Sequelize.STRING,
        allowNull: false},
    password: {
        type: Sequelize.STRING,
        allowNull: false},
    inventory_id: {
        type: Sequelize.INTEGER,
        allowNull: true},
    },{
        timestamps: false,            // CAN REMOVE once not using seed data
    });
    user.associate = function (models){
        user.belongsToMany(models.item, {
            through:"userItem",// <----------- be careful to call this whatever is being exported (ESPECIALLY WHEN DIFFERENT FROM MODEL FILE NAME)
            foreignKey: "userId"
        });
    }
    return User
}

