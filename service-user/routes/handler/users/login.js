const bcrypt = require("bcrypt");
const { Users } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    email: { type: "email", empty: false },
    password: { type: "string", min: 6, max: 12 },
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      code: 400,
      status: "error",
      descriptions: validate,
    });
  }

  const user = await Users.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return res.status(404).json({
      code: 404,
      status: "error",
      descriptions: "Email not valid",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(404).json({
      code: 404,
      status: "error",
      descriptions: "Password not valid",
    });
  }

  res.status(200).json({
    code: 200,
    status: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      profression: user.profession,
    },
  });
};
