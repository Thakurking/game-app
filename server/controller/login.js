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

//Nodemailer Connection Setup
let transporter = nodemailer.createTransport({
    service: mail.service,
    auth: {
      user: mail.user,
      pass: mail.pass,
    }
  })

//Database Table Models
const users = require("../model/user");

//#region User Login Route
exports.login = async(req, res)=> {
  try {
    const {Email, Password} = req.body;
    if(!Email || !Password){
      return res
      .status(400)
      .json({err: "Pleasse Add All Input Fields"})
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email)){
      return res
      .status(400)
      .json({err: "Please Enter Valid Email"})
    }
    await users.findOne({
      Email: Email,
      Password: Password,
      Status: "A"
    }, (err, obj) =>{
      if(err){
        console.log(err)
        return res
        .status(400)
        .json({err: "Error Occured Please Try Again"})
      }
      if(obj === null){
        return res
        .status(400)
        .json({msg: "No User Found"})
      }else{
        bcrypt.compare(Password, obj.Password, (err, res) =>{
          if(err){
            console.log(err)
            return res
            .status(400)
            .json({err: "Error Occured Please Try Again"})
          }
          if(res !== true){
            return res
            .status(400)
            .json({msg: "Wrong Email Or Password Please Try Again"})
          }else{
            const token = jwt.sign({data: obj._id}, bcr.secretkey, {expriesIn: "1h"})
            const {Id, Email, Name} = obj
            res.json({token, user:{Id, Email, Name}})
          }
        })
      }
    }) 
  } catch (error) {
    console.log(error)
    return res
    .status(500)
    .json({err: "Internal Server Error Please try Again Later"})
  }
}
//#endregion