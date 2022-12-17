const pool = require("../../../config/db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query("SELECT * FROM category", (err, result) => {
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
      const { name } = req.body;

      conn.query(
        "INSERT INTO category(category) VALUES (?)",
        [name],
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
        "UPDATE category SET category=? WHERE category=?",
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
        "DELETE FROM `category` WHERE `category` = ?",
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
