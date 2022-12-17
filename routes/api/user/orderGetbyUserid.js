const pool = require("../../../config/db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool.getConnection(function (err, conn) {
    const id = req.body.id;
  
    if (err) {
      console.log(err)
    } else {
      conn.query(
        "SELECT * FROM orders WHERE user_id=?",
        [id],
        (err, result) => {
          res.send(result);
        }
      );
    }
    pool.releaseConnection(conn);
  });
});

module.exports = router;
