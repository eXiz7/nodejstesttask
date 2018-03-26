
const config    = require('../config/config.js');
let express     = require('express');
let userCtrl    = require('../controllers/userController');
let prodCtrl    = require('../controllers/productController');
let router = express.Router();


router.options('*', (req, res) => {
    res.status(200).json();
});

router.post('/users/login', (req, res) => {
    //return access token if username and password is correct otherwise error
    userCtrl.login(req.body)
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        sendError(res, err.code, err.message);
    })
});

router.get('/users/logout', (req, res) => {
    //remove access token or send error if not auth
    userCtrl.logout(req)
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        sendError(res, 401, err);
    })
});

router.get('/users/me', (req, res) => {
    //return current user or send error if not auth
    userCtrl.getMe(req)
    .then(data => {
        res.status(200).json(data);
    }).catch(err => {
        sendError(res, 401, err);
    });
});

//bonus task
router.get('/products', (req, res) => {
    userCtrl.validateRequest(req)
    .then(data => {
        prodCtrl.getAll(req.query)
        .then(prod => res.status(200).json(prod))
        .catch(err => {
            sendError(res, 401, err);  
        });
    }).catch(err => {
        sendError(res, 401, err);
    });
});

router.post('/products', (req, res) => {
    //create new product or send error if not auth
    userCtrl.validateRequest(req)
    .then(data => {
        prodCtrl.create(req, data)
        .then(prod => res.status(200).json(prod))
        .catch(err => {
            sendError(res, 401, err);  
        });
    }).catch(err => {
        sendError(res, 401, err);
    });
});

router.get('/products/:id', (req, res) => {
    //return a product or send error if not auth
    userCtrl.validateRequest(req)
    .then(data => {
        prodCtrl.getById(req.params.id)
        .then(prod => res.status(200).json(prod))
        .catch(err => {
            sendError(res, 401, err);  
        });
    }).catch(err => {
        sendError(res, 401, err);
    });
});

router.put('/products/:id', (req, res) => {
    //update a product or send error if not auth
    userCtrl.validateRequest(req)
    .then(data => {
        prodCtrl.updateById(req)
        .then(data => res.status(200).json(data))
        .catch(err => {
            sendError(res, 401, err);  
        });
    }).catch(err => {
        sendError(res, 401, err);
    });
});

function sendError(res, code, message) {
    res.status(code).json({
        status: code,
        error: code === 401? "unauthorized" : message
    });
}

module.exports = router;