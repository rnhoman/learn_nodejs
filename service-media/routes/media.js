const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const { Media } = require("../models");
const fs = require("fs");

router.get("/", async (req, res) => {
  const media = await Media.findAll({
    // jika ingin menampilkan id dan image nya saja
    // attributes: ["id", "image"],
    // jika ingin menampikan berdasarkan desc
    order: [["id", "DESC"]],
  });

  const mappedMedia = media.map((m) => {
    m.image = `${req.get("host")}/${m.image}`;
    return m;
  });

  return res.status(200).json({
    code: 200,
    descriptions: "list media",
    data: mappedMedia,
  });
});
router.post("/", (req, res) => {
  const image = req.body.image;
  if (!isBase64(image, { mimeRequired: true })) {
    return res
      .status(400)
      .json({ code: 400, status: "error", descriptions: "Invalid not base64" });
  }

  base64Img.img(image, "./public/images", Date.now(), async (err, filepath) => {
    if (err) {
      return res
        .status(400)
        .json({ code: "400", status: "error", descriptions: err.message });
    }

    const filename = filepath.split("/").pop();
    const media = await Media.create({
      image: `images/${filename}`,
    });

    return res.status(200).json({
      code: 200,
      status: "success",
      data: {
        id: media.id,
        image: `${req.get("host")}/images/${filename}`,
      },
    });
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const media = await Media.findByPk(id);

  if (!media) {
    return res.status(422).json({
      code: 422,
      status: "error",
      descriptions: "Media not found",
    });
  }

  fs.unlink(`./public/${media.image}`, async (err) => {
    if (err) {
      return res.status(400).json({
        code: 400,
        status: "error",
        descriptions: err.message,
      });
    }
    await media.destroy();
    return res.status(200).json({
      code: 200,
      status: "success",
      descriptions: "image deleted",
    });
  });
});

module.exports = router;
