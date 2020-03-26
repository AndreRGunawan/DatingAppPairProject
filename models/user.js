'use strict';
const passwordHash = require('password-hash');

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        nameValidator(name) {
          if(!name || name.length < 3) {
            throw new Error(`Name must be filled and name length must be at least 3 characters !`)
          }
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'Email already in use!'
      }
    },
    phone_number: {
      type : DataTypes.STRING,
      validate: {
        phonNumberValidator(number) {
          if(!number) {
            throw new Error(`Phone number must be filled`)
          }
        }
      },
      unique: {
        args: true,
        msg: 'Phone Number Already in use'
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        ageValidator(age) {
          if(age < 18) {
            throw new Error(`Your Age isn't allowed to join this site, Have studied well first`)
          }
        }
      }
    },
    look_for: {
      type : DataTypes.STRING,
      validate: {
        isLookForValidator(look) {
          if(this.gender.toLowerCase() == 'male' && look == 'male') {
            throw new Error(`Male must be looking for girl, LGBT is not allowed !`)
          } else if(this.gender.toLowerCase() == 'female' && look == 'female') {
            throw new Error(`Female must be looking for girl, LGBT is not allowed !`)
          }
        }
      }
    },
    location: DataTypes.STRING,
    bio: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    hooks : {
      beforeCreate(User, options) {
        return passwordHash.generate(User.password);
      },
      afterFind: function(result, options, fn){
        if(result.length === 0){
          throw new Error('Username is wrong!')
        } else {
          return result
        }
      }
    },
    sequelize,
    modelName: 'User'
  })

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Image, { through: 'UserImage'})
  };
  return User;
};