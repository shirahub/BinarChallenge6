const userRepo = require("../repository/db/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../lib/error/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getUserList() {
  return await userRepo.getUserList();
}

const userHandler = {
  getUserList: () => {
    return getUserList();
  },
};

module.exports = userHandler;
