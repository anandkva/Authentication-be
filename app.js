var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
var app = express();
var loginRouter = require("./routes/login");
var signinRouter = require("./routes/signin");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./db");

const client=require("./redis");

app.use(cors({ origin: "*" }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


client.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.log(err.message);
})


connectDb();



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/login", loginRouter);
app.use("/signin", signinRouter);



app.listen("4000", () => {
  console.log(`app listening on port`)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
