//Multer
const multer = require("multer")
//UUID
const { v4: uuidv4 } = require('uuid')
//fs
const fs = require("fs")

const DIR = "../public/banner";

module.exports = storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        if(!fs.existsSync(DIR)){
            fs.mkdir(DIR)
        }
        cb(null, DIR)
    },
    filename: (req, file, cb) =>{
        const filename = file.originalname.toLocaleLowerCase().split(' ').join('-')
        if(file.mimetype === "image/jpg"){
            cb(null, uuidv4() + '-' + filename + ".jpg")
        }
        else if(file.mimetype === "image/jpeg"){
            cb(null, uuidv4() + '-' + filename + ".jpeg")
        }
        else if(file.mimetype === "image/png"){
            cb(null, uuidv4() + '-' + filename + ".png")
        }
        else{
            cb(null, "")
        }
    }
})

module.exports = upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) =>{
        if(file.mimetype.match(/jpe|jpeg|png|$i/)){
            cb(null, true)
        }else{
            cb(null, false)
            return cb(new Error('File Format Type Not Supported'))
        }
    }
})