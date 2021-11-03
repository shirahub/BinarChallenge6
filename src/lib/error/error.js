const httpStatusCodes = require("http-status-codes");

class CustomError extends Error {
  constructor(code) {
    super();
    this.code = code;
    this.reason = httpStatusCodes.getReasonPhrase(code);
  }
}

module.exports = CustomError;
