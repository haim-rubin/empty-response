const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const moment = require('moment')

const waitSeconds = (seconds = 2) => (
  new Promise((resolve) => {
    const start = moment()
    let end
    do {
      end = moment()
    } while (end.diff(start, 'seconds') < seconds);
     resolve()
  })
)

const seconds = 2

const server = port => {
  return new Promise((resolve, reject) => {
    const app = express();
    const server = http.createServer(app);
    app.use(bodyParser.json());

    app.use(function(req, res, next) {
      console.log(req.url)
      next()
    })
    app.get('/data1', (req, res) => {
      waitSeconds(seconds)
        .then(() => {
          res.json({ data: 'Data-1' })
        })
    })

    app.get("/data2", (req, res) => {
      waitSeconds(seconds).then(() => {
        res.json({ data: "Data-2" });
      });
    })

    app.get("/data3", (req, res) => {
      waitSeconds(seconds).then(() => {
        res.json({ data: "Data-3" });
      });
    })

    server.listen(port, () => {
      console.log(`Listening on ${port} ${__dirname}`);
      resolve({ message:`Listening on ${port}`, port })
    })
  })
}

module.exports = server