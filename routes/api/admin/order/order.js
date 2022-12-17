const pool = require("../../../../config/db");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    } else {
      conn.query("SELECT * FROM orders", (err, result) => {
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
      const { cartItems, shippingAddress, extrainformation, user_id } =
        req.body;

      const c = JSON.stringify(cartItems);
      const s = JSON.stringify(shippingAddress);
      const e = JSON.stringify(extrainformation);
      const u = parseInt(user_id);
 

      conn.query(
        "INSERT INTO `orders` (`id`, `productdetails`, `extra_information`, `date`, `status`, `delivery_location`, `user_id`) VALUES (NULL, ?, ?, current_timestamp(), 'pending', ?, ?)",
        [c, e, s, u],
        (error, results) => {
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
      const { order_id } = req.body;

      conn.query(
        "UPDATE `orders` SET `status` = 'confirmed' WHERE `orders`.`id` = ?",
        [order_id],
        (error, results) => {
          res.status(201).send("ok");
        }
      );
    }
    pool.releaseConnection(conn);
  });
});

module.exports = router;
