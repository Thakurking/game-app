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
//Multer
const multer = require("multer");

//connecting mongoose databse
mongoose.connect(
  "mongodb://localhost/my_database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("mongoDB connection established");
  }
);

//Middleware File
const photo = require("../middleware/multer");


//Controllers
const SignupController = require("../controller/signup");
const LoginController = require("../controller/login");
const AdminRequestController = require("../controller/adminSignup");
const AdminLoginController = require("../controller/adminLogin");
const TournamnetController = require("../controller/tournamentCreate");

router.post("/signup", SignupController.signup);

router.get("/verification", SignupController.verification);

router.post("/login", LoginController.login);

router.get("/admin_request_gamo", AdminRequestController.admin_request_gamo);

router.post("/adminLogin", AdminLoginController.adminLogin);

router.post(
  "/tournamentCreate",
  photo.upload.single("banner"),
  TournamnetController.tournamentCreate
);

module.exports = router;
