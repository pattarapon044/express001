const router = require("express").Router();
const file = require("../attachments/utils");

router.use((req, res, next) => {
  console.log("first");
  next();
});

router.get("/", (req, res) => {
  res.send({
    message: "Get",
  });
});

router.post("/", file.save("file", "image"), (req, res) => {
  res.send({
    files: req.files,
    message: "Ok",
  });
});

module.exports = router;
