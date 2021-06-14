const { Users, RefreshToken } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const userId = req.body.user_id;
  const refreshToken = req.body.refresh_token;

  const schema = {
    refresh_token: { type: "string" },
    user_id: { type: "number" },
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      code: 400,
      status: "error",
      descriptions: validate,
    });
  }

  const user = await Users.findByPk(userId);
  if (!user) {
    return res.status(404).json({
      code: 404,
      status: "error",
      descriptions: "User not found",
    });
  }

  const createRefreshToken = await RefreshToken.create({
    token: refreshToken,
    user_id: userId,
  });

  return res.status(200).json({
    code: 200,
    status: "success",
    data: createRefreshToken,
  });
};
