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
const mail = require("../config/mail")
const bcr = require("../config/bcrypt")
const admindetail = require("../config/adminDetail")

//Nodemailer Connection Setup
let transporter = nodemailer.createTransport({
    service: mail.service,
    auth: {
      user: mail.user,
      pass: mail.pass,
    }
  })

//Database Table Models
const admin = require("../model/admin")

//#region Admin Request Hande Route
exports.admin_request_gamo = async(req, res) =>{
    const Id = req.query.Id
    const Password = req.query.Password
    const Secretkey = req.query.SecretKey
    if(!Id || !Password || !Secretkey){
        return res
        .status(400)
        .json({err: "No Credential Entered"})
    }
    if(Password !== admindetail.Password){
        return res
        .status(400)
        .json({err: "Password Wrong"})
    }
    if(Id !== admindetail.Id){
        return res
        .status(400)
        .json({err: "Is Wrong"})
    }
    if(Secretkey !== admindetail.Secretkey){
        return res
        .status(400)
        .json({err: "Secret Key Wrong"})
    }
}

