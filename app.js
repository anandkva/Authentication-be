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


const session = require('express-session');
const redis = require('redis');
const RedisStore = require("connect-redis").default


app.use(cors({ origin: "*" }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
connectDb();

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
})
redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});
//Configure session middleware
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'secret$%^134',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 1000 * 60 * 10 // session max age in miliseconds
  }
}))




// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.get("/", (req, res) => {
  const sess = req.session;
  console.log(sess)
  if (sess.username && sess.password) {
      if (sess.username) {
          res.write(`<h1>Welcome ${sess.username} </h1><br>`)
          res.write(
              `<h3>This is the Home page</h3>`
          );
          res.end('<a href=' + 'https://sweet-zuccutto-419db2.netlify.app' + '>Click here to log out</a >')
      }
  } else {
      res.send("hello world")
  }
});

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
