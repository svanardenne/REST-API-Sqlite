const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    estimatedTime: {
      type: DataTypes.STRING,
    },
    materialsNeeded: {
      type: DataTypes.STRING,
    }
  },
  {sequelize});

  // Add associations
  User.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey
    });
  }

  return Course;
}