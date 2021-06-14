const express = require("express");
const router = express.Router();
const refreshTokenHandler = require("./handler/refresh-token");

router.post("/", refreshTokenHandler.create);
router.get("/", refreshTokenHandler.getToken);

module.exports = router;
