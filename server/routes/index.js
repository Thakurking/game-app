//express
const express = require('express');
//express router
const router = express.Router();
//mongoose
const mongoose = require('mongoose');
//Nodemailer
const nodemailer = require("nodemailer");


//connecting mongoose databse
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if(err) throw err;
  console.log("mongoDB connection established")
});

///Nodemailer Connection Setup
const mail = require("../config/mail")
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mail.user,
    pass: mail.pass,
  }
})

//Database Table
const users = require("../model/user")


router.post('/signup', async (req, res)=> {
  try {
    const {Email, Phone, Name, Password, PasswordCheck} = req.body;
    if(!Email || !Phone || !Password || !Name){
      return res
      .status(400)
      .json({error: "please add all fields"})
    }
    if(Password.length < 6){
      return res
      .status(400)
      .json({error: "Password must be at least 6 characters"})
    }
    if(Password !== PasswordCheck){
      return res
      .status(400)
      .json({error: "Enter same password twice correctly"})
    }
    const existingUser = await users.findOne({Email: Email})
    if(existingUser){
      return res
      .status(400)
      .json({error: "Email already exist"})
    }else{
      const otp = Math.floor(Math.random() * 10000 + 1)
      const mailOption = {
        from: mail.user,
        to: Email,
        subject: `Account Verification`,
        html: `<h1>Account Verification</h1><br><hr><p>Please click to the link below to activate your account</p>
        <br><a href="http://localhost:3000/verification?verify=${otp}">Activate</a>`,
      }
    }
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
