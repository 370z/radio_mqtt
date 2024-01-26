const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/user');

class Thing extends Model { };

Thing.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  thingName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: ['user_id'],
      msg: 'Thing name must be unique for each user.',
    },
    validate: {
      notNull: {
        msg: 'Thing name cannot be null.',
      },
      notEmpty: {
        msg: 'Thing name cannot be empty.',
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Description cannot be null.',
      },
      notEmpty: {
        msg: 'Description cannot be empty.',
      },
    },
  },
  hardware: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Hardware cannot be null.',
      },
      notEmpty: {
        msg: 'Hardware cannot be empty.',
      },
    },
  },
}, {
  sequelize,
  modelName: 'Thing',
  timestamps: true,
})

Thing.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Thing;

