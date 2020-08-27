//express
const express = require("express");
//express router
const router = express.Router();
//mongoose
const mongoose = require("mongoose");
//Validator
const Validator = require('validatorjs');

//Database Table Models
const tournamnet = require("../model/tournamentForm");

//Configuration File
const photo = require("../middleware/multer")

exports.tournamentCreate = photo.single('image'), async(req, res) =>{
    console.log("hello")
    const { Name, Banner, noOfPlayers, Description, Fee } = req.body
    if(!Name || !Banner || !noOfPlayers || !Description || !Fee){
        return res
        .json({message: "Please Add All The Fields", isSucess: false})
    }else{
        let data = {
            Name: Name,
            Banner: Banner,
            noOfPlayers: noOfPlayers,
            Description: Description,
            Fee: Fee,
        }
        let rules = {
            Name: 'required',
            Banner: 'required',
            noOfPlayers:  'numeric',
            Description: 'required',
            Fee: 'numeric',
        }
        let validation = new Validator(data, rules)
        const isValid = validation.passes()
        if(!isValid){
            return res
            .json({Error: validation.errors.errors, isSucess: false})
        }
    }
}