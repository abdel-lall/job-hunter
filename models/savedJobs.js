module.exports = function (sequelize, DataTypes) {
    var savedjob = sequelize.define("savedjob", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
     }, 
      title: DataTypes.STRING ,
      employer: DataTypes.STRING,
      location: DataTypes.STRING,
      salary: DataTypes.STRING,
      description: DataTypes.TEXT
    });
    
      
        savedjob.associate = function(models){
        //job belongs to one Username
        savedjob.belongsTo(models.user, {
            foreignKey: {
              allowNull: false
            }
          });
      };
      

        return savedjob;

    }

  
