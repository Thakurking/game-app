//express
const express = require("express");
//express router
const router = express.Router();
//mongoose
const mongoose = require("mongoose");
//Nodemailer
const nodemailer = require("nodemailer");
//Bcrypt
const bcrypt = require("bcrypt");
//Validator
const validator = require("validator");

//Configuration files
const mail = require("../config/mail");
const bcr = require("../config/bcrypt");

//Nodemailer Connection Setup
let transporter = nodemailer.createTransport({
  service: mail.service,
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

//Database Table Models
const users = require("../model/user");

//#region User Signup Route
exports.signup = async (req, res) => {
  try {
    console.log("hello");
    const { Email, Phone, Name, Password, PasswordCheck } = req.body
    if (!Email || !Phone || !Password || !Name) {
      return res
        .json({ Error: "Please Add All The Fields", isSuccess: false });
    }
    if (Password.length < 6) {
      return res
        .json({ Error: "Password must be at least 6 characters", isSuccess: false });
    }
    if (Password !== PasswordCheck) {
      return res
        .json({ Error: "Enter same password twice correctly", isSuccess: false });
    }
    if (!validator.isEmail(Email)) {
      return res.json({ Error: "Please Enter valid Email", isSuccess: false });
    }
    if (!validator.isMobilePhone(Phone)) {
      return res.json({ Error: "Please Enter Valid Number", isSuccess: false });
    }
    const existingUser = await users.findOne({ Email: Email });
    if (existingUser) {
      return res.json({ Error: "Email Already Exist", isSuccess: false });
    } else {
      const otp = Math.floor(Math.random() * 10000 + 1);
      const mailOption = {
        from: mail.user,
        to: Email,
        subject: `Gamo Account Verification`,
        html: `<h1>Account Verification</h1><br><hr><p>Please click to the link below to activate your account</p>
          <br><button><a href="http://localhost:5000/verification?verify=${otp}">Activate</a></button>`,
      };
      transporter.sendMail(mailOption, (err, info) => {
        if (err) {
          console.log(err);
          return res.json(err);
        } else {
          bcrypt.genSalt(bcr.round, (err, salt) => {
            if (err) {
              console.log(err);
              return res.json({ Error: "Salt Not Created", isSuccess: false });
            } else {
              bcrypt.hash(Password, salt, async (err, hash) => {
                console.log(err);
                if (err) {
                  return res
                    .json({ Error: "Could Not Hashed Password", isSuccess: false });
                } else {
                  await users.create(
                    {
                      Email: Email,
                      Password: hash,
                      Phone: Phone,
                      Status: "F",
                      Name: Name,
                      Verification: otp,
                    },
                    async (err, result) => {
                      if (err) {
                        console.log(err);
                        return res.json({
                          Error: "Cound Not Register User Please Try Again",
                          isSuccess: false
                        });
                      } else {
                        return res.json({
                          message:
                            "ThankYou For Registration We Have Sent Verification Link In Your Email Please Verify",
                          isSuccess: true
                        });
                      }
                    }
                  );
                }
              });
            }
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ Error: "internal Server Error", isSuccess: false });
  }
};
//#endregion

//#region Verification Route
exports.verification = async (req, res) => {
  try {
    const otp = req.query.verify;
    await users.findOne(
      {
        Verification: otp,
      },
      async (err, Obj) => {
        if (err) {
          console.log(err);
          return res.send("Error Occurred Please Try Again");
        }
        if (Obj == null) {
          console.log(Obj);
          return res.send("OTP Not found");
        } else {
          if (otp == Obj.Verification) {
            users.update(
              { Verification: otp },
              { $set: { Status: "A" } },
              async (err, Obj) => {
                if (err) {
                  console.log(err);
                  return res.send("Cound Not Verified OTP Please try Again");
                }
                if (Obj === null) {
                  console.log(Obj);
                  return res.send("OTP Not Verified");
                } else {
                  console.log(Obj);
                  return res.send("OTP Verified Sucessfully ThankYou");
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .json({ Error: "Internal Server Error Please Try Again Later", isSuccess: false });
  }
};
//#endregion
