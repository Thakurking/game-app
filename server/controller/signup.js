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
const users = require("../model/user")

//#region User Signup Route
exports.signup = async (req, res)=> {
    try {
      console.log("hello")
      const {Email, Phone, Name, Password, PasswordCheck} = req.body;
      if(!Email || !Phone || !Password || !Name){
        return res
        .status(400)
        .json({err: "Please Add The Fields"})
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
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email)){
        return res
        .status(400)
        .json({err: "Please Enter valid Email"})
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
        .json({error: "Email Already Exist"})
      }else{
        const otp = Math.floor(Math.random() * 10000 + 1)
        const mailOption = {
          from: mail.user,
          to: Email,
          subject: `Gamo Account Verification`,
          html: `<h1>Account Verification</h1><br><hr><p>Please click to the link below to activate your account</p>
          <br><button><a href="http://localhost:3000/verification?verify=${otp}">Activate</a></button>`,
        };
        transporter.sendMail(mailOption, (err, info) => {
          if(err){
            console.log(err)
            return res.status(400).json(err)
          }else{
            bcrypt.genSalt(bcr.round, (err, salt) =>{
              if(err){
                console.log(err)
                return res
                .status(400)
                .json({err: "Salt Not Created"})
              }else{
                bcrypt.hash(Password, salt, async(err, hash)=>{
                  console.log(err)
                  if(err){
                    return res
                    .status(400)
                    .json({err: "Could Not Hashed Password"})
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
                        console.log(err)
                        return res
                        .status(400)
                        .json({err: "Cound Not Register User Please Try Again"})
                      }else{
                        return res
                        .status(400)
                        .json({msg: "ThankYou For Registration We Have Sent Verification Link In Your Email Please Verify"})
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
      console.log(error)
      return res
      .status(500)
      .json({err: "internal Server Error"})
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
      console.log(error)
        return res
        .status(500)
        .json({err: "Internal Server Error Please Try Again Later"})
    }
  }
  //#endregion