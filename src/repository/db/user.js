const { StatusCodes } = require("http-status-codes");
const models = require("../models");
const CustomError = require("../../lib/error/error");

const getUserList = () => {
  return new Promise(async function (resolve, reject) {
    const users = await models.User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: models.UserBiodata,
        as: "userBiodata",
        attributes: {
          exclude: ["id", "userId", "createdAt", "updatedAt"],
        },
      },
    });
    resolve(users);
  });
};

const userRepo = {
  getUserList: () => {
    return getUserList();
  },
};

module.exports = userRepo;
