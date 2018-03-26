'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.INTEGER
        },
        created_by: {
            type: DataTypes.INTEGER,
            model: 'User', 
            key: 'id' 
        }
    }, {
        timestamps: false
    });

    Product.get = function(filter) {
        return this.findOne({ where: filter});
    }

    Product.getAll = function(models) {
        return this.findAll({ include: [{model:models.User, attributes:['username']}] });
    }

    Product.getAllWhere = function(models, page, limit, price, username) {
        let offset = page > 1 ? (page - 1) * limit : 0;
        return this.findAll({where:{'$User.username$': username}, include: [{model:models.User, attributes:['username']}], offset: offset, limit:limit });
    }

    Product.updateBy = function(data, filter) {
        return this.update(data, {where: filter});
    }

    Product.associate = function (models) {
        models.Product.belongsTo(models.User, {foreignKey: 'created_by'});
    };
    
    return Product;
};