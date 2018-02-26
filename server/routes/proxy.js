
var express = require('express');
var router = express.Router();

var api = require("../controllers/apiproxy")
var login = require("../controllers/login")

/* api */
router.use('/api', api);
router.post('/login', login);

module.exports = router