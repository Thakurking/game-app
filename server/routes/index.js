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
const AdminController = require("../controller/adminSignup")


router.post('/signup', (req, res) =>{ 
  SignupController.signup
})

router.post('/verification', (req, res) =>{
  SignupController.verification
})

router.post('/login', (req, res) =>{
  LoginController.login
})

router.post('/admin_request_gamo', (req, res)=>{
  AdminController.admin-request
})

module.exports = router;