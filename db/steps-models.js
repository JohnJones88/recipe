const { sequelize } = require('./data-connections');
const { DataTypes } = require('sequelize');
const Recipe = require('./recipe-models');

const Steps = sequelize.define('steps', {
    recipeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  
    sortNumber:{
        type:DataTypes.INTEGER,
        allowNull: false

    },
    description:{
        type:DataTypes.STRING(64),
        allowNull: false

    },


})

Recipe.hasMany(Steps);
Steps.belongsTo(Recipe);


module.exports = Steps;