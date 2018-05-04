var express = require('express');
var router = express.Router();

/* Settings */

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users.pug');
});

/* coll page */
router.get('/perfil', function(req, res, next) {
  res.render('perfil.pug');
});

module.exports = router;
