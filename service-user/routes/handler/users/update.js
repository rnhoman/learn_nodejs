const bcrypt = require("bcrypt");
const { Users } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: { type: "string", empty: false },
    email: { type: "email", empty: false },
    password: { type: "string", min: 6, max: 12 },
    profession: { type: "string", optional: true },
    avatar: { type: "string", optional: true },
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      code: 400,
      status: "error",
      descriptions: validate,
    });
  }

  const id = req.params.id;
  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(404).json({
      code: 404,
      status: "error",
      descriptions: "Account not found",
    });
  }

  const email = req.body.email;
  if (email) {
    const checkEmail = await Users.findOne({
      where: { email },
    });

    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        code: 409,
        status: "error",
        descriptions: "Email already exist",
      });
    }
  }

  const password = await bcrypt.hash(req.body.password, 10);
  const { name, profession, avatar } = req.body;

  await user.update({
    email,
    password,
    name,
    profession,
    avatar,
  });

  return res.status(200).json({
    code: 200,
    status: "success",
    data: {
      id: user.id,
      name,
      email,
      profession,
      avatar,
    },
  });
};
