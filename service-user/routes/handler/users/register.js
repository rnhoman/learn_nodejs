const { Users } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const { token } = require("morgan");

const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: { type: "string", empty: false },
    email: { type: "email", empty: false },
    password: { type: "string", min: 6, max: 12 },
    profession: { type: "string", optional: true },
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

  if (user) {
    return res.status(409).json({
      code: 409,
      status: "error",
      descriptions: "Email already exist",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };

  const createUser = await Users.create(data);

  if (createUser) {
    return res.status(200).json({
      code: 200,
      status: "success",
      data: {
        id: createUser.id,
      },
    });
  }
};
