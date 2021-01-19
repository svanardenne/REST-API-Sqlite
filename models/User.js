const {Model, DataTypes, HasMany} = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    emailAddress: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    }
  },
  {sequelize});

  // Add associations
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey
    });
  }

  return User;
}