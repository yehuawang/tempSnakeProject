// const http = require('http')
// const PORT = 3000
// const server = http.createServer((req, res) =>{
//     res.setHeader('Content-Type', 'application/json');
//     if (req.method == 'GET' && req.url == '/api/data'){
//         res.writeHead(200);
//         res.end(JSON.stringify({

//         }))
//     }
// })

import fs from "fs";
import http from "http";
import path from "path";
import url from "url";

// Local port for http server to listen on
const PORT = 9000;
const API_KEY = process.env.API_KEY;

const mimeType = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
};

http
  .createServer((req, res) => {
    console.log(`  ${req.method} ${req.url}`);
    const parsedUrl = url.parse(req.url);

    let sanitizedPath = path
      .normalize(parsedUrl.pathname)
      .replace(/^(\.\.[\/\\])+/, "")
      .substring(1);
    if (sanitizedPath === "API_KEY") {
        res.end(API_KEY);
        return;
      }
    if (sanitizedPath === "") {
      sanitizedPath = "dashboard.html";
    }
    const ext = path.parse(sanitizedPath).ext;
    try {
      const data = fs.readFileSync(sanitizedPath);
      // If the file is found, set Content-Type and send data
      if (mimeType[ext]) {
        res.setHeader("Content-Type", mimeType[ext]);
      }
      res.end(data);
    } catch (err) {
      // If the file is not found, return 404
      res.statusCode = 404;
      res.end();
    }
  })
  .listen(parseInt(PORT));

console.log(
  `Server listening: http://localhost:${PORT} `,
);