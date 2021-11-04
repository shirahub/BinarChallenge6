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

const getUserDetail = (id) => {
  return new Promise(async function (resolve, reject) {
    const user = await models.User.findByPk(id, {
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
    resolve(user);
  });
};

const createNewUser = ({
  username,
  password,
  fullName,
  email,
  phoneNumber,
}) => {
  return new Promise(async function (resolve, reject) {
    return models.sequelize
      .transaction(function (t) {
        return models.User.create(
          {
            username: username,
            password: password,
          },
          { transaction: t }
        ).then(function (user) {
          return models.UserBiodata.create(
            {
              userId: user.id,
              fullName: fullName,
              email: email,
              phoneNumber: phoneNumber,
            },
            { transaction: t }
          );
        });
      })
      .then(function (result) {
        resolve(result);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const editUser = ({
  userId,
  username,
  password,
  fullName,
  email,
  phoneNumber,
}) => {
  return new Promise(async function (resolve, reject) {
    return models.sequelize
      .transaction(function (t) {
        return models.User.update(
          {
            username: username,
            password: password,
          },
          {
            where: {
              id: userId,
            },
          },
          { transaction: t }
        ).then(function (user) {
          return models.UserBiodata.update(
            {
              fullName: fullName,
              email: email,
              phoneNumber: phoneNumber,
            },
            {
              where: {
                userId: userId,
              },
            },
            { transaction: t }
          );
        });
      })
      .then(function (result) {
        resolve(result);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const deleteUser = (id) => {
  return new Promise(async function (resolve, reject) {
    const user = await models.User.destroy({
      where: {
        id: id,
      },
    });
    resolve(user);
  });
};

const userRepo = {
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

module.exports = userRepo;
