const pool = require("../../../../config/db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "SELECT * FROM products ",

        (err, result) => {
          res.send(result);
        }
      );
    }
    pool.releaseConnection(conn);
  });
});

module.exports = router;

