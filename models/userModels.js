module.exports = function(sequelize, Datatypes){
    const User = sequelize.define("User",  {
    id: {
            type: Datatypes.UUID,
            defaultValue: Datatypes.UUIDV1,
            primaryKey: true
          },
    account_name: {
        type: Datatypes.STRING,
        allowNull: false},
    email: {
        type: Datatypes.STRING,
        allowNull: false,
        unique:true
        },
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

