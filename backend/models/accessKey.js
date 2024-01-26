const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Channel = require('../models/channel');

class AccessKey extends Model { };

AccessKey.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    keyValue: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: ['channel_id'],
            msg: 'Access Key must be unique for each channel.',
          },
        validate: {
            notNull: {
                msg: 'Key cannot be null.',
            },
            notEmpty: {
                msg: 'Key cannot be empty.',
            },
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Key description cannot be null.',
            },
            notEmpty: {
                msg: 'Key description cannot be empty.',
            },
        },
    },
    readable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    updatable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'AccessKey',
    timestamps: true,
})


AccessKey.belongsTo(Channel, { foreignKey: 'channel_id' });

module.exports = AccessKey;

