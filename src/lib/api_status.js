function apiStatus(res, result, code = 500) {
  if (result instanceof Error) {
    res.status(result.code).json(result);
  } else {
    res.status(code).json(result);
  }
  return res;
}

module.exports = apiStatus;
