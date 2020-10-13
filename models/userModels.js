module.exports = function(sequelize, Datatypes){
    const User = sequelize.define("User",  {
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
    // items_id: {
    //     type: Sequelize.INTEGER,             this is necessary as a seed
    //     allowNull: true},
    },{
        timestamps: false,            
    });
    User.associate = function (models){
        User.belongsToMany(models.item, {
            through:"userItem",// <----------- be careful to call this whatever is being exported (ESPECIALLY WHEN DIFFERENT FROM MODEL FILE NAME)
            foreignKey: "userId"
        });
    }
    return User
}

