const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

//admin routes imports
const oneOrderGet = require("./routes/api/admin/order/oneOrderGet");
const order = require("./routes/api/admin/order/order");
const uploadproduct = require("./routes/api/admin/product/uploadproduct");
const category = require("./routes/api/admin/category");
const subCategory = require("./routes/api/admin/subCategory");
//auth routes imports
const nextauth = require("./routes/api/auth/nextauth");
const signup = require("./routes/api/auth/signup");

//user routes imports
const orderGetbyUserid = require("./routes/api/user/orderGetbyUserid");
const oneProductGet = require("./routes/api/user/product/oneProductGet");
const productsGet = require("./routes/api/user/product/productsGet");

//admin Routes
app.use("/api/admin/order/oneOrderGet", oneOrderGet);
app.use("/api/admin/order/order", order);
app.use("/api/admin/product/uploadproduct", uploadproduct);
app.use("/api/admin/category", category);
app.use("/api/admin/subCategory", subCategory);
//auth routes
app.use("/api/auth/nextauth", nextauth);
app.use("/api/auth/signup", signup);
// user Routes
app.use("/api/user/orderGetbyUserid", orderGetbyUserid);
app.use("/api/user/product/oneProductGet", oneProductGet);
app.use("/api/user/product/productsGet", productsGet);

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`api listening on http://localhost:${port}`);
});
