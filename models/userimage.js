'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserImage extends sequelize.Sequelize.Model { }
  UserImage.init({
    UserId: DataTypes.INTEGER,
    ImageId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName : 'UserImage'
  })

  UserImage.associate = function(models) {
    // associations can be defined here
    UserImage.belongsTo(models.User);
    UserImage.belongsTo(models.Image);
  };
  return UserImage;
};