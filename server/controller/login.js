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
//JWT
const jwt = require('jsonwebtoken');

//Configuration files
const bcr = require("../config/bcrypt")

//Database Table Models
const users = require("../model/user");

//#region User Login Route
exports.login = async(req, res)=> {
  try {
    const {Email, Password} = req.body;
    if(!Email || !Password){
      return res
      .status(400)
      .json({Error: "Pleasse Add All Input Fields", isSuccess: false})
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email)){
      return res
      .status(400)
      .json({Error: "Please Enter Valid Email", isSuccess: false})
    }
    await users.findOne({
      Email: Email,
      Status: "A"
    }, (err, Obj) =>{
      if(err){
        console.log(err)
        return res
        .status(400)
        .json({Error: "Error Occured Please Try Again", isSuccess: false})
      }
      if(Obj == null){
        return res
        .status(400)
        .json({message: "No User Found", isSuccess: false})``
      }else{
        bcrypt.compare(Password, Obj.Password, (err, result) =>{
          if(err){
            console.log(err)
            return res
            .status(400)
            .json({Error: "Error Occured Please Try Again", isSuccess: false})
          }
          if(result !== true){
            return res
            .status(400)
            .json({message: "Wrong Email Or Password Please Try Again", isSuccess: false})
          }else{
            const token = jwt.sign({data: Obj._id}, bcr.key, {expiresIn: "1h"})
            const {Id, Email, Name} = Obj
            res.json({token, user:{Id, Email, Name}})
          }
        })
      }
    }) 
  } catch (error) {
    console.log(error)
    return res
    .status(500)
    .json({Error: "Internal Server Error Please try Again Later", isSuccess: false})
  }
}
//#endregion