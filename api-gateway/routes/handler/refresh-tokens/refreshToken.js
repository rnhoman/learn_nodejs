const jwt = require("jsonwebtoken");
const apiAdapter = require("../../apiAdapter");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const email = req.body.email;

    if (!refreshToken || !email) {
      return res.status(400).json({
        code: 400,
        status: "error",
        descriptions: "invalid token",
      });
    }

    await api.get("/refresh_token", {
      params: { refresh_token: refreshToken },
    });
    jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          code: 403,
          status: "error",
          descriptions: err.message,
        });
      }

      if (email !== decoded.data.email) {
        return res.status(400).json({
          code: 400,
          status: "error",
          descriptions: "email is not valid",
        });
      }

      const token = jwt.sign(
        {
          data: decoded.data,
        },
        JWT_SECRET,
        { expiresIn: JWT_ACCESS_TOKEN_EXPIRED }
      );

      return res.status(200).json({
        code: 200,
        status: "success",
        data: {
          token,
        },
      });
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(400).json({
        code: 400,
        status: "error",
        descriptions: "Service users unavaible",
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
