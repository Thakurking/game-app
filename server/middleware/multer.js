//Multer
const multer = require("multer");
//UUID
const { v4: uuidv4 } = require("uuid");
//fs
const fs = require("fs");

const DIR = "public/banner/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(DIR)) {
      fs.mkdir(DIR);
    }
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLocaleLowerCase().split(" ").join("-");
    if (file.mimetype === "image/jpg") {
      cb(null, uuidv4() + "-" + filename);
    } else if (file.mimetype === "image/jpeg") {
      cb(null, uuidv4() + "-" + filename);
    } else if (file.mimetype === "image/png") {
      cb(null, uuidv4() + "-" + filename);
    } else {
      cb(null, "");
    }
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/jpg|jpeg|png|$i/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("File Format Type Not Supported"));
    }
  },
});

exports.upload = upload;
