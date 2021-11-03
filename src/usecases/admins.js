const adminRepo = require("../repository/statics/admins");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../lib/error/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(username, password) {
  let admin = await adminRepo.getAdmin(username);

  return new Promise(async (resolve, reject) => {
    if (admin && (await bcrypt.compare(password, admin.password))) {
      let token = jwt.sign(
        { id: admin.id, username: admin.username },
        "secret!?",
        {
          expiresIn: "72h",
        }
      );
      resolve({ id: admin.id, username: admin.username, token: token });
    }
    reject(new CustomError(StatusCodes.UNAUTHORIZED));
  });
}

const adminHandler = {
  login: (username, password) => {
    return login(username, password);
  },
};

module.exports = adminHandler;
