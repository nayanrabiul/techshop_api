const pool = require("../../../../config/db");
const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  pool.getConnection(function (err, conn) {
   
    let id = req.query.id;
  
    if (err) {
      console.log(err)
    } else {
      conn.query(
        "SELECT * FROM products WHERE id=?",
        [id],
        (err, result) => {
          res.send(result[0]);
        }
      );
    }
    pool.releaseConnection(conn);
  });
});

module.exports = router;

