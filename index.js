const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const cartRoutes = require("./routes/cart.js");
const orderRoutes = require("./routes/order.js");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "http://zuitt-bootcamp-prod-482-8068-javier.s3-website.us-east-1.amazonaws.com",
    "http://localhost:3000",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_STRING, {});
mongoose.connection.once("open", () =>
  console.log("Now Connected to MongoDB Atlas.")
);

app.use("/b2/users", userRoutes);
app.use("/b2/products", productRoutes);
app.use("/b2/cart", cartRoutes);
app.use("/b2/orders", orderRoutes);

if (require.main === module) {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`API is now online on port ${process.env.PORT || 3000}`);
  });
}

module.exports = { app, mongoose };
