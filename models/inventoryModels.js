

// unit_count:{
//     type: Sequelize.INTEGER,
//     allowNull: true
// },

const itemModels = require("./itemModels");


// item.associate = function(models)    {
    item.belongsToMany(models.user, {
        through: "useritem"
        foreignKey: "itemId"
    })
}