const bcrypt = require("bcrypt");
const salt = await bcrypt.genSalt(5);

const encryptString = (str) => {
  return bcrypt.hash(str, salt);
};
