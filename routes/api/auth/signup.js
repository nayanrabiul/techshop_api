var bcryptjs = require("bcryptjs");
const pool = require("../../../config/db");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      const { name, email, password } = req.body;
      if (
        !name ||
        !email ||
        !email.includes("@") ||
        !password ||
        password.trim().length < 5
      ) {
        res.status(422).json({
          message: "Validation error",
        });
        return;
      }
      conn.query(
        "SELECT * FROM users where email=?",
        [email],
        (err, result) => {
          if (result.length > 0) {
            res.status(422).json({ message: "User exists already!" });
            return;
          }
        }
      );

      const h_password = bcryptjs.hashSync(password);

      conn.query(
        "INSERT INTO users(name,email,password,isAdmin) VALUES (?,?,?,?)",
        [name, email, h_password, "false"],
        (err, result) => {
          res.status(201).send({
            message: "Created user!",
          });
        }
      );
    }
    pool.releaseConnection(conn);
  });
});

module.exports = router;
