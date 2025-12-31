const { sequelize } = require('./data-connections');
const { DataTypes } = require('sequelize');
const Recipe = require('./recipes-models');

const Steps = sequelize.define('steps', {
    recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
    id: {
      type: DataTypes.INTEGER,
      //autoIncrement: true,
      primaryKey: true
    },
    RecDescription:{
      type:DataTypes.STRING(64),
      allowNull: false
    },
  
    sortNumber:{
        type:DataTypes.INTEGER,
        allowNull: false

    },
    


})

Recipe.hasMany(Steps);
Steps.belongsTo(Recipe);


module.exports = Steps;