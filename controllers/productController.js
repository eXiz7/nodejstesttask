const models      = require('../models');
const config      = require('../config/config.js');

function create(req, data) {
    return models.Product.create({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        created_by: data.id
    });
}

function updateById(req) {
    return models.Product.updateBy({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount
    }, {id: parseInt(req.params.id)});
}

function getById(prodId) {
    return models.Product.get({id: prodId});
}

function getAll(data) {
    //if request has query return filtered list else return all products for creator
    return data? getAllWhere(data) : models.Product.getAll(models);
}

function getAllWhere(data) {
    return models.Product.getAllWhere(models, data.page, data.limit, data.price, data.username);
}

module.exports = {
    create: create,
    getById: getById,
    getAll: getAll,
    getAllWhere: getAllWhere,
    updateById: updateById
}