'use strict';
module.exports = (sequelize, DataTypes) => {
  class Image extends sequelize.Sequelize.Model {}
  Image.init({
    file: {
      type: DataTypes.STRING
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    love: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dislike: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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