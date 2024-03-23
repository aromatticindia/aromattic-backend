const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://aromatticindia:Q1H2NqFyKFxDD3NG@aromattic.lyyczns.mongodb.net/?retryWrites=true&w=majority&appName=Aromattic",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const app = express();

const productRoutes = require("./routes/product");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", productRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server started");
});
