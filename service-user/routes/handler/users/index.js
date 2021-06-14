const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const update = require("./update");
const getUser = require("./getUser");
const getUsers = require("./getUsers");

module.exports = {
  register,
  login,
  update,
  getUser,
  getUsers,
  logout,
};
