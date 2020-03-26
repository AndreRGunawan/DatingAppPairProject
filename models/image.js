'use strict';
module.exports = (sequelize, DataTypes) => {
  class Image extends sequelize.Sequelize.Model {}
  Image.init({
    file: DataTypes.STRING,
    like: DataTypes.INTEGER,
    love: DataTypes.BOOLEAN,
    dislike: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName : 'Image'
  })

  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsToMany(models.User, { through: 'UserImage' })
  };
  return Image;
};