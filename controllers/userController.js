const jwt         = require('jsonwebtoken');
const models      = require('../models');
const config      = require('../config/config.js');

function login(data) {
    return new Promise((resolve, reject) => {
        if(!data.username) return reject({code: 406, message: "No username provided!"});

        models.User.get({username:data.username, password: data.password}).then((user) => {
            if(user !== null) {
                let token = jwt.sign({id: user.id}, config.secret);
                return resolve({auth:true, access_token: token});
            } else {
                return reject({code: 406, message: `User with username - "${data.username}" and password - "${data.password}" is not found!`});
            }
        }).catch(err => {
            return reject({code: 500, message: err});
        });
    });
}

function logout(req) {
    return new Promise((resolve, reject) => {
        validateRequest(req).then(data => {
            //on the client would remove cookies or localstorage
            return resolve({auth:false, access_token: null});
        }).catch(reject);
    });
}

function getMe(req) {
    return new Promise((resolve, reject) => {
        validateRequest(req).then(data => {
            models.User.get({id: data.id}).then(resolve).catch(reject);
        }).catch(reject);
    });
}

function validateRequest(req) {
    return new Promise((resolve, reject) => {
        let token = req.headers['x-access-token'];
        if(!token) return reject("No token provided!");
        jwt.verify(token, config.secret, (err, data) => {
            if(err) return reject(err);
            resolve(data);
        });
    });
}

module.exports = {
    login: login,
    logout: logout,
    getMe: getMe,
    validateRequest: validateRequest
}