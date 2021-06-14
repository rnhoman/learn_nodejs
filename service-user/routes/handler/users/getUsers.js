const { Users } = require("../../../models");

module.exports = async (req, res) => {
  const userIds = req.query.user_ids || [];

  // ini utk filter berdasarkan id yg ingin di tampilkan
  const sqlOptions = {
    attributes: ["id", "name", "email", "role", "profession", "avatar"],
  };

  // jadi yg di filter berdasarkan id
  if (userIds.length) {
    sqlOptions.where = {
      id: userIds,
    };
  }

  const users = await Users.findAll(sqlOptions, {
    order: [["id", "DESC"]],
  });

  return res.status(200).json({
    code: 200,
    status: "success",
    data: users,
  });
};
