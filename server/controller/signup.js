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
    service: "gmail",
    auth: {
      user: mail.user,
      pass: mail.pass,
    }
  })

//Database Table Models
const users = require("../model/user");

//#region Signup Route
exports.signup = async (req, res)=> {
    try {
      const {Email, Phone, Name, Password, PasswordCheck} = req.body;
      if(!Email || !Phone || !Password || !Name){
        return res
        .status(400)
        .json({err: "please add all fields"})
      }
      if(Password.length < 6){
        return res
        .status(400)
        .json({err: "Password must be at least 6 characters"})
      }
      if(Password !== PasswordCheck){
        return res
        .status(400)
        .json({err: "Enter same password twice correctly"})
      }
      if(Phone.length <10 && !Phone.length>10 && isNaN(Phone)){
          return res
          .status(400)
          .json({err: "Please Enter Valid Number"})
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
          subject: `Gamo Account Verification`,
          html: `<h1>Account Verification</h1><br><hr><p>Please click to the link below to activate your account</p>
          <br><a href="http://localhost:3000/verification?verify=${otp}">Activate</a>`,
        };
        transporter.sendMail(mailOption, (err, info) => {
          if(err){
            return res.status(400).json(err)
          }else{
            bcrypt.genSalt(bcr.round, function(err, salt){
              if(err){
                return res
                .status(400)
                .json({err: "salt coud not be created"})
              }else{
                bcrypt.hash(Password, salt, async(err, hash)=>{
                  if(err){
                    return res
                    .status(400)
                    .json({err: "could not hashed password"})
                  }else{
                    await users.create({
                      Email: Email,
                      Password: hash,
                      Phone: Phone,
                      Status: "F",
                      Name: Name,
                      Verification: otp,
                    }, async(err, result)=>{
                      if(err){
                        return res
                        .status(400)
                        .json({err: "Cound not register user"})
                      }else{
                        return res
                        .status(400)
                        .json({msg: "ThankYou For Registration We Have Sent You Mail Verification Link In Your Mail Please Verify"})
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    } catch (error) {
      res
      .status(500)
      .json(error)
    }
  }
//#endregion


//#region Verification Route
exports.verification = async(req, res)=>{
    try {    
    const otp = req.query.verify
    await user.findOne({
      Verification: otp
    }, async(err, Obj)=>{
      if(err){
        console.log(err)
        return res
        .send("Error Occurred Please Try Again")
      }
      if(Obj === null){
        console.log(Obj)
        return res
        .send("OTP Not found")
      }else{
        if(otp == Obj.Verification){
          users.update({ Verification: otp }, { $set: { Status: "A" }}, async(err, Obj)=>{
            if(err){
              console.log(err)
              return res
              .send("Cound Not Verified OTP Please try Again")
            }
            if(Obj === null){
              console.log(Obj)
              return res
              .send("OTP Not Verified")
            }else{
              console.log(Obj)
              return res
              .send("OTP Verified Sucessfully ThankYou")
            }
          })
        }
      }
    }) 
    } catch (error) {
        res
        .status(500)
        .json(error)
    }
  }
  //#endregion