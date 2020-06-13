var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('responrad with a resource');

});

router.put('/', function (req, res) {
    res.send('POST request to the homepage')
})

module.exports = router;