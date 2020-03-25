'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    look_for: DataTypes.STRING,
    location: DataTypes.STRING,
    bio: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User'
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};