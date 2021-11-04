const userRepo = require("../repository/db/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../lib/error/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getUserList() {
  return await userRepo.getUserList();
}

async function getUserDetail(id) {
  return await userRepo.getUserDetail(id);
}

async function createNewUser(userData) {
  return await userRepo.createNewUser(userData);
}

async function editUser(userData) {
  return await userRepo.editUser(userData);
}

async function deleteUser(id) {
  return await userRepo.deleteUser(id);
}

const userHandler = {
  getUserList: () => {
    return getUserList();
  },
  getUserDetail: (id) => {
    return getUserDetail(id);
  },
  createNewUser: (userData) => {
    return createNewUser(userData);
  },
  editUser: (userData) => {
    return editUser(userData);
  },
  deleteUser: (id) => {
    return deleteUser(id);
  },
};

module.exports = userHandler;
