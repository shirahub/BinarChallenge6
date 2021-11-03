const express = require("express");
const userHandler = require("../usecases/users");
const apiStatus = require("../lib/api_status");
const { body, validationResult } = require("express-validator");
const CustomError = require("../lib/error/error");
const { StatusCodes } = require("http-status-codes");

var api = express.Router();

api.get("/", function (req, res, next) {
  userHandler
    .getUserList()
    .then((result) => {
      apiStatus(res, result, 200);
    })
    .catch((err) => {
      apiStatus(res, err);
    });
});

module.exports = api;
