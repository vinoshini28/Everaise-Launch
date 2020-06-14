var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
require('dotenv/config');


/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');

});
router.put('/', function (req, res) {
  res.send('POST request to the homepage')
})



module.exports = router;