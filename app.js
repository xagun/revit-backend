require("dotenv").config();

const { urlencoded } = require("express");
const express = require("express");
const app = express();
const path = require("path");

const morgan = require("morgan");
const cors = require("cors");
const mysqlConnect = require('./configs/db.config');
//PORT
const PORT = process.env.PORT;

// Routing level middleware
const APIRoute = require("./routes/api.route");

// CORS
app.use(cors());

//for file
app.use(express.static("uploads")); // for__dirname,'uploads' serving
app.use("/file", express.static(path.join(__dirname, "uploads"))); // for external serving

// server must parse incoming request
// parse from-encoded-data
app.use(
  urlencoded({
    extended: true,
  })
);
// JSON  parser
app.use(express.json());
// this middleware will parse incoming data and add it in req.body property

app.use(morgan("dev"));



// socket communication

// require('./configs/socket')(app);

// loading the routing
app.use("/api", APIRoute);

app.use(function (req, res, next) {
  next({
    msg: "Not Found",
    status: 404,
  });
});

app.use(function (err, req, res, next) {
  console.log("error is >>", err);

  res.status(err.status || 400);
  res.json({
    msg: err.msg || err,
    status: err.status || 400,
  });
});




app.listen(PORT, function (err, done) {
  if (err) {
    console.log("server listening failed. Execution terminated.");
  } else {
    console.log(`API is started on http://localhost:${PORT}`);
    console.log("press CTRL + C to exit");
  }
});
