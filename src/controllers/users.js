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

api.get("/:id", function (req, res, next) {
  userHandler
    .getUserDetail(req.params.id)
    .then((result) => {
      apiStatus(res, result, 200);
    })
    .catch((err) => {
      apiStatus(res, err);
    });
});

api.post("/", function (req, res, next) {
  userHandler
    .createNewUser(req.body)
    .then((result) => {
      apiStatus(res, result, 200);
    })
    .catch((err) => {
      apiStatus(res, err);
    });
});

api.patch("/:userId", function (req, res, next) {
  req.body.userId = req.params.userId;
  userHandler
    .editUser(req.body)
    .then((result) => {
      apiStatus(res, result, 200);
    })
    .catch((err) => {
      apiStatus(res, err);
    });
});

api.delete("/:id", function (req, res, next) {
  userHandler
    .deleteUser(req.params.id)
    .then((result) => {
      apiStatus(res, result, 200);
    })
    .catch((err) => {
      apiStatus(res, err);
    });
});

module.exports = api;
