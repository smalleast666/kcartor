var express = require('express');
var router = express.Router();

var login = require("../controllers/login")

router.post('/login', login);


module.exports = router;