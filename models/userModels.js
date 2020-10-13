
// INITIAL USER CREATION
const User = sequelize.define("User",  {
    username: {
        type: Sequelize.STRING,
        allowNull: false},
    password: {
        type: Sequelize.STRING,
        allowNull: false},
    email: {
        type: Sequelize.STRING,
        allowNull: false},
    inventory_table_id: {
        type: Sequelize.INTEGER,
        allowNull: true},
    },{
        freezeTableName: true,        // keeps from becoming pluralized 
        timestamps: false,            // CAN REMOVE once not using seed data
    });
  
User.sync();