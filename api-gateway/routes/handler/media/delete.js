const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_MEDIA } = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const media = await api.delete(`/media/${id}`);
    console.log(media);
    return res.json(media.data);
  } catch (error) {
    if (error.code === "ECONNREFUSES") {
      return res.status(500).json({
        code: 500,
        status: "error",
        descriptions: "Service media unavaible",
      });
    }
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
