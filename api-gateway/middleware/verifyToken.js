const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET, function (err, descoded) {
    if (err) {
      return res.status(403).json({
        code: 403,
        status: err.message,
      });
    }
    req.user = descoded;
    return next();
  });
};
