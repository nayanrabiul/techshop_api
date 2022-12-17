const pool = require("../../../config/db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const email = req.query.email;
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "SELECT * FROM `users` WHERE email=?",
        [email],
        (err, result) => {
          if (err) {
            res.send("err");
          } else {
            if (result.length < 1) res.send("err");
            else res.send(result[0]);
          }
        }
      );
    }
    pool.releaseConnection(conn);
  });
});

module.exports = router;
