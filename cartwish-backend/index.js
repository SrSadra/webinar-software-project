const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/connectDB");

const app = express();
const PORT = process.env.PORT || 5000;

// import routes
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/category");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/category", express.static(__dirname + "/upload/category"));
app.use("/profile", express.static(__dirname + "/upload/profiles"));
app.use("/products", express.static(__dirname + "/upload/products"));

// adding routes
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
