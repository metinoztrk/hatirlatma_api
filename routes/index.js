var express = require('express');
var router = express.Router();
const respond = require('../helpers/respond');

router.get('/', function(req, res, next) {
  respond.success(res,"express started");
});

module.exports = router;