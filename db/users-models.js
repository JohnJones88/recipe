const { sequelize } = require('./data-connections');
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');

const Users = sequelize.define('users', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    first_name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(256),
        unique: true,
        validate: {
            isEmail: true
        },
        allowNull: false
    },

    user_name: {
        type: DataTypes.STRING(256),
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
}, {
    hooks: {
        beforeSave: async (users, options) => {

            if (users.isNewRecord || users.changed('password')) {
                const saltRounds = 10;
                users.password = await bcrypt.hash(users.password, saltRounds);
            }
        }
    }
});

module.exports = Users;
