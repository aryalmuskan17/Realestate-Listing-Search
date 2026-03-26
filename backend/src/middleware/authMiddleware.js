const setUserRole = (req, res, next) => {
  const role = req.headers["x-user-role"];

  req.user = {
    is_admin: role === "admin",
  };

  next();
};

module.exports = { setUserRole };