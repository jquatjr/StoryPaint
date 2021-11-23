var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
const cors = require("cors");
const app = express();

const cRouter = require("./routes/colorings");
const uRouter = require("./routes/users");

// view engine setup

app.use(logger("dev"));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: false, limit:"50mb" }));


app.use(cors());
app.use("/users", uRouter);
app.use("/colorings", cRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err)
});

module.exports = app;
