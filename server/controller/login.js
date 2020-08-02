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

//Configuration files
const mail = require("../config/mail")
const bcr = require("../config/bcrypt")

//Nodemailer Connection Setup
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mail.user,
      pass: mail.pass,
    }
  })

//Database Table Models
const users = require("../model/user");