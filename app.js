const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const wishlistRouter = require("./routes/wishlist");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", indexRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/users", usersRouter);

app.use("/api/auth", authRouter);

module.exports = app;
