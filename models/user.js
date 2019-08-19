'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 32],
          msg: 'Your password needs to be 8-32 chars in length'
        }
      }
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bio: DataTypes.TEXT,
    profile: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: {
          msg: 'Provide a valid image url!'
        }
      }
    }
  }, {

    hooks: {
      beforeCreate: (pendingUser) => {

        // Hash the password before storing
        if (pendingUser && pendingUser.password) {
          pendingUser.password = bcrypt.hashSync(pendingUser.password, 12);
        }
      }
    }

  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};