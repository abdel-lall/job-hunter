module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },

        name: DataTypes.STRING ,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    })
  
    return user;
  };