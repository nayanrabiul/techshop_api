const multer = require("multer");
const pool = require("../../../../config/db");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("myImage", 12), (req, res) => {
  const filearray = [];
  req.files.forEach((x) => {
    filearray.push(x.filename);
  });


    if (
      !req.body.title &&
      !req.body.stock &&
      !req.body.price &&
      !req.body.descriptions
    ) {
      res.send({ ok: "error" });
    } else {
      pool.getConnection(function (err, conn) {
        conn.query(
          "INSERT INTO products(title,stock,price,descriptions,images,subcategory_id) VALUES (?,?,?,?,?,?)",
          [
            req.body.title,
            req.body.stock,
            req.body.price,
            req.body.descriptions,
            filearray.toString(),
            req.body.subcategory_id,
          ],
          (err, result) => {
            res.send("Files uploaded successfully");
          }
        );

        pool.releaseConnection(conn);
      });
    }
});

module.exports = router;
