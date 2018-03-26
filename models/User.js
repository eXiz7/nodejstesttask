'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['password'] }
        }
    });

    User.get = function(filter) {
        return this.findOne({ where: filter}, {password: 0});
    }

    User.associate = function(models) {
        models.User.hasMany(models.Product, {foreignKey: 'created_by'});
    };

    return User;
};