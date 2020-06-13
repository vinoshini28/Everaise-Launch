 var firebase = require("firebase");

 var express = require('express');
 var router = express.Router();
 var admin = require('firebase-admin');
 var bodyParser = require('body-parser')

 require('dotenv/config');

 admin.initializeApp({
   credential: admin.credential.cert({
     "type": "service_account",
     "project_id": "launch-8f860",
     "private_key_id": process.env.private_key_id,
     "private_key": process.env.private_key,
     "client_email": "firebase-adminsdk-rt8ek@launch-8f860.iam.gserviceaccount.com",
     "client_id": "100523490499848859189",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rt8ek%40launch-8f860.iam.gserviceaccount.com"
   }),
   databaseURL: 'https://launch-8f860.firebaseio.com/'
 });


 router.get('/', function (req, res, next) {
   res.end();
 });
 router.use(bodyParser.text());
 var roles = process.env.roles;
 router.post('/auth', function (req, res, next) {
   for (var user_uid in roles) {

     admin.auth().setCustomUserClaims(user_uid, {
       isAdmin: roles[user_uid]["isAdmin"],
       isMathI: roles[user_uid]["isMathI"],
       isMathII: roles[user_uid]["isMathII"],
       isPhysics: roles[user_uid]["isPhysics"],
       isBio: roles[user_uid]["isBio"],
       isAstro: roles[user_uid]["isAstro"],
     }).then(() => {
       console.log("Authenticated user")
     }).catch((err) => {
       console.log(err)
     });
   }
   res.end();
 });

 router.post('/roles', function (req, res, next) {

   admin.auth().getUser(req.body.uid).then((userRecord) => {
     console.log(userRecord.customClaims)
     res.send(userRecord.customClaims)
   }).catch((err) => {
     console.log(err);
   });

 });

 router.post('/forumpost', function (req, res, next) {

   admin.auth().getUser(req.body.uid).then((userRecord) => {
     console.log(userRecord.customClaims)
     res.send(userRecord.customClaims)
   }).catch((err) => {
     console.log(err);
   });

 });


 module.exports = router;