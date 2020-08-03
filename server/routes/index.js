//express
const express = require('express');
//express router
const router = express.Router();
//mongoose
const mongoose = require('mongoose');
//Nodemailer
const nodemailer = require("nodemailer");
//Bcrypt
const bcrypt = require('bcrypt');


//connecting mongoose databse
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}, (err) => {
  if(err) throw err;
  console.log("mongoDB connection established")
});


//Controllers
const SignupController = require("../controller/signup")
const LoginController = require("../controller/login")


router.post('/signup', function(req, res){ 
  SignupController.signup
})

router.post('/verification', function (req, res){
  SignupController.verification
})

router.post('/login', function(req, res){
  LoginController.login
})

module.exports = router;