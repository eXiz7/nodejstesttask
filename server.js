"use strict"
let http = require('http');
let app = require('../app.js');
let models = require('../models');

let port = normalizePort(process.env.PORT || '5454');
app.set('port', port);
const server = http.createServer(app);

models.sequelize.sync({force:true}).then(() => {
    models.User.create({
        username: 'admin',
        password: '123'
    }).then((data) => {
        server.listen(port, () => {
            console.log('Express server listening on port ' + server.address().port);
        });
        server.on('error', onError);
        server.on('listening', onListening);
    }).catch(onError);
});


function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(server.address().port + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(server.address().port + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    console.log('Listening on ' + server.address().port);
}