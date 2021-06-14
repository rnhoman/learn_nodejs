const { Users } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await Users.findByPk(id, {
    attributes: ["id", "name", "email", "role", "profession", "avatar"],
  });

  if (!user) {
    return res.status(400).json({
      code: 400,
      status: "error",
      descriptions: "User not found",
    });
  }

  return res.status(200).json({
    code: 200,
    status: "success",
    data: user,
  });
};
