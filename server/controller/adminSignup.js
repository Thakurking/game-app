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
const bcr = require("../config/bcrypt");
const admindetail = require("../config/adminDetail");

//Database Table Models
const admin = require("../model/admin");

//#region Admin Request Hande Route
exports.admin_request_gamo = async (req, res) => {
  try {
    const Gmail = req.query.Id;
    const Password = req.query.Password;
    const Secretkey = req.query.SecretKey;
    if (!Gmail || !Password || !Secretkey) {
      return res.status(400).json({ err: "No Credential Entered" });
    }
    if (Password !== admindetail.Password) {
      return res.status(400).json({ err: "Password Wrong" });
    }
    if (Gmail !== admindetail.Gmail) {
      return res.status(400).json({ err: "Id Wrong" });
    }
    if (Secretkey !== admindetail.Secretkey) {
      return res.status(400).json({ err: "Secret Key Wrong" });
    }
    const existAdmin = await admin.findOne({Email: Gmail})
    if(existAdmin){
        return res
        .status(400)
        .json({err: "Key Already Exist Please try Another Key"})
    }else{
      await admin.create(
          {
            Email: Gmail,
            Password: bcrypt.hashSync(Password, bcr.round),
            Status: "A",
          },
          async (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(400)
                .json({ err: "Some Error Occured Please Try Again" });
            }
            if (result === null) {
              return res.status(400).json({ err: "Cound Not Create Admin Access" });
            } else {
              return res.status(400).json({ msg: "Your Admin Access Created" });
            }
          }
      );
    }
  } catch (error) {
    console.log(error)
    return res
    .status(400)
    .json({err: "Internal Server Error"})
  }
};
//#endregion