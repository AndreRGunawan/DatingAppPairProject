'use strict';
module.exports = (sequelize, DataTypes) => {
  class Image extends sequelize.Sequelize.Model {}
  Image.init({
    file: {
      type: DataTypes.STRING
    },
    like: {
      type: DataTypes.INTEGER,
    },
    love: {
      type: DataTypes.BOOLEAN,
    },
    dislike: {
      type: DataTypes.INTEGER,
    },
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