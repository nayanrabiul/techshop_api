const pool = require("../../../config/db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query("SELECT * FROM subcategory", (err, result) => {
        res.send(result);
      });
    }
    pool.releaseConnection(conn);
  });
});

router.post("/", (req, res) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      const { name, cat_id } = req.body;

      conn.query(
        "INSERT INTO subcategory(subcategory,category_id) VALUES (?,?)",
        [name, cat_id],
        (err, result) => {
          res.send("ok");
        }
      );
    }
    pool.releaseConnection(conn);
  });
});

router.put("/", (req, res) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      const { name, newName } = req.body;

      conn.query(
        "UPDATE `subcategory` SET `subcategory` = ? WHERE `subcategory` = ?;",
        [newName, name],
        (err, result) => {
          res.send(result);
        }
      );
    }
    pool.releaseConnection(conn);
  });
});

router.delete("/", (req, res) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      const { name } = req.body;

      conn.query(
        "DELETE FROM `subcategory` WHERE `subcategory` = ?",
        [name],
        (err, result) => {
          res.send(result);
        }
      );
    }
    pool.releaseConnection(conn);
  });
});

module.exports = router;
