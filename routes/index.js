const express = require("express");
const router = express.Router();
const { http } = require("../constants");

router.get("/health", (req, res) => {
  res.status(http.Success.code).json(http.Success);
});

router.use("/users", require("./users"));

/**
 * @desc   Catch 404 and handle error
 */
router.use("*", (req, res) => {
  res.status(http.NotFound.code).json(http.NotFound);
});

module.exports = router;
