const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_USER } = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.post("/users/register", req.body);

    return res.json(user.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(400).json({
        code: 500,
        status: "error",
        descriptions: "Service users unavaible",
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
