const { Users, RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  const userId = req.body.user_id;
  const user = await Users.findByPk(userId);

  if (!user) {
    return res.status(400).json({
      code: 400,
      status: "error",
      descriptions: "User not found",
    });
  }

  await RefreshToken.destroy({
    where: { user_id: userId },
  });

  return res.status(200).json({
    code: 200,
    status: "success",
    descriptions: "refresh token deleted",
  });
};
