//express
const express = require("express");
//express router
const router = express.Router();
//mongoose
const mongoose = require("mongoose");
//ValidatorJs
const Validator = require("validatorjs");
//Multer
const multer = require("multer");

//Database Table Models
const tournamnets = require("../model/tournaForm");

exports.tournamentCreate = async (req, res) => {
  try {
    console.log("hello");
    console.log(req.file);
    const {
      tournamentName,
      noOfPlayers,
      tournamentDescription,
      tournamentFee,
      teamType,
    } = req.body;
    const banner = req.file.filename;
    let data = {
      tournamentName: tournamentName,
      noOfPlayers: noOfPlayers,
      tournamentDescription: tournamentDescription,
      tournamentFee: tournamentFee,
      teamType: teamType,
    };
    let rules = {
      tournamentName: "required",
      noOfPlayers: "required|numeric|max:100",
      tournamentDescription: "required",
      tournamentFee: "required",
      teamType: "required",
    };
    let validation = new Validator(data, rules);
    let isValid = validation.passes();
    if (!isValid) {
      return res.json({ Error: validation.errors.errors, isSuccess: false });
    } else {
      try {
        tournamnets
          .create({
            tournamentName: tournamentName,
            banner: banner,
            noOfPlayers: noOfPlayers,
            tournamentDescription: tournamentDescription,
            tournamentFee: tournamentFee,
            teamType: teamType,
          })
          .then((tournament) => {
            console.log(tournament);
            res.json({
              message: "Tournament Created Successfully",
              isSuccess: true,
              tournament: tournament,
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              Error: "Error Occured Please Try Again",
              isSuccess: false,
            });
          });
      } catch (error) {
        return res.json({
          error: error,
          isSuccess: false,
          Error: "Could Not Run At This Movement Please Try Again",
        });
      }
    }
  } catch (error) {
    return res.json({
      Error: "Internal Server Error PLease Try Again",
      isSuccess: false,
      error: error,
    });
  }
};