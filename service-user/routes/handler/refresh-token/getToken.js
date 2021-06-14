const { RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  const refreshToken = req.query.refresh_token;
  const token = await RefreshToken.findOne({
    where: { token: refreshToken },
  });

  if (!token) {
    return res.status(400).json({
      code: 400,
      status: "error",
      descriptions: "invalid token",
    });
  }

  return res.status(200).json({
    code: 200,
    status: "success",
    token,
  });
};
