module.exports = function (sequelize, DataTypes) {
    var savedjob = sequelize.define("savedjob", {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
     }, 
      title: DataTypes.STRING ,
      employer: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.TEXT,
      url : DataTypes.TEXT,
      status : DataTypes.STRING,
      reminder : DataTypes.STRING,
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

  
