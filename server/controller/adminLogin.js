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
//Validator
const validator = require('validator');

//Configuration files
const bcr = require("../config/bcrypt")
const admindetail = require("../config/adminDetail")

//Nodemailer Connection Setup
let transporter = nodemailer.createTransport({
    service: mail.service,
    auth: {
      user: mail.user,
      pass: mail.pass,
    },
  });

//Database Table Models
const admin = require("../model/admin")

exports.adminLogin = async(req, res) =>{
    const {Gmail, Password} = req.body
    if(!Gmail || !Password){
        return res
        .status(400)
        .json({err: "Please Enter All the Fields"})
    }
}