const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use("/static", express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), "uploads"));
    } catch (e) {}

    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

app.post("/single", upload.single("file"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send("Single file upload success");
});

app.post("/multiple", upload.array("file", 2), (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.send("Single file upload success");
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
