const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Thing = require('../models/thing');

class Channel extends Model { };

Channel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    channelName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: ['thing_id'],
            msg: 'Channel name must be unique for each thing.',
          },
        validate: {
            notNull: {
                msg: 'Channel name cannot be null.',
            },
            notEmpty: {
                msg: 'Channel name cannot be empty.',
            },
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Channel description cannot be null.',
            },
            notEmpty: {
                msg: 'Channel description cannot be empty.',
            },
        },
    },
    channelType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Channel type cannot be null.',
            },
            notEmpty: {
                msg: 'Channel type cannot be empty.',
            },
        },
    },
}, {
    sequelize,
    modelName: 'Channel',
    timestamps: true,
})

Channel.belongsTo(Thing, { foreignKey: 'thing_id' });

module.exports = Channel;

