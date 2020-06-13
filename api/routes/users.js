var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
require('dotenv/config');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(process.env.SECRET);

});
router.get('/new', function (req, res, next) {
  res.send('respond with a resource new');

});
router.put('/uid', function (req, res) {
  res.send('POST request to the homepage')
})

router.post('/', function (req, res) {
  res.send(req.body)
})


// admin.auth().setCustomUserClaims(897432900, {
//   admin: true
// }).then(() => {

// });

module.exports = router;