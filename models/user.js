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
        image : {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '/images/unknown.jpg',
        },
        portfolio : DataTypes.STRING,
        github : DataTypes.STRING,
        resume : DataTypes.STRING,
        linkedin : DataTypes.STRING,
    })
  
    return user;
  };