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
const mail = require("../config/mail")

//Nodemailer Connection Setup
let transporter = nodemailer.createTransport({
    service: mail.service,
    auth: {
      user: mail.user,
      pass: mail.pass,
    },
  });

//Database Table Models
const admin = require("../model/admin");

exports.adminLogin = async(req, res) =>{
  try {
    const {Gmail, Password} = req.body
    if(!Gmail || !Password){
        return res
        .status(400)
        .json({err: "Please Enter All the Fields"})
    }
    await admin.findOne({
      Email: Gmail,
      Password: Password,
      Status: "A",
      Role: "SuperAdmin"
    }, async(err, obj) =>{
      if(err){
        console.log(err)
        return res
        .status(400)
        .json({err: "Error Occured Please try Again"})
      }
      if(obj == null){
        return res
        .status(400)
        .json({err: "Admin Not Found"})
      }else{
        bcrypt.compare(Password, obj.Password, (err, res) =>{
          if(err){
            return res
            .status(400)
            .json({err: "Error Occured Please Try Again"})
          }
          if(res !== true){
            return res
            .status(400)
            .json({err: "Wrong Email Or Password PLease Try Again"})
          }else{
            const adminToken = jwt.sign({data: obj._id}, bcr.key, {expriesIn: "1h"})
            const {Id, Email, Name} = obj
            res.json({adminToken, Admin:{Id, Email, Name}})
          }
        })
      }
    })
  } catch (error) {
    console.log(error)
    return res
    .status(400)
    .json({err: "Internal Server Error Please Try Again"})
  }
}