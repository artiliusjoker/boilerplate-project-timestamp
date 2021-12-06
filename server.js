// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// get whoami
app.get("/api/whoami", function (req, res) {
  const language = req.get("Accept-Language");
  const userAgent = req.get("User-Agent");
  const userIP = req.ip;
  res.json({
    ipaddress: userIP,
    language: language,
    software: userAgent,
  });
});

// get timestamp
app.get("/api/:inputDate?", function (req, res) {
  const input = /^[0-9]*$/.test(req.params.inputDate)
    ? Number(req.params.inputDate)
    : req.params.inputDate;
  let inputDate = new Date(input);

  if (isNaN(inputDate) && input != undefined) {
    res.json({ error: "Invalid Date" });
    return;
  }

  if (input === undefined) {
    inputDate = new Date();
  }
  const unix = inputDate.getTime();
  const utc = inputDate.toUTCString();

  res.json({
    unix: unix,
    utc: utc,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
