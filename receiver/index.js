"use strict";

/*
 *  Modify this file as needed.
 */

const http = require("http");
const decompressAndPrint = require("./receiver");

process.on("SIGTERM", function () {
  process.exit(0);
});

const server = http.createServer(function (req, res) {
  decompressAndPrint(req, res);
});

server.listen(8080);

// 86968 -- brotli -- ~28% less bytes read
// 95344 --- gzip -- ~21% less bytes read
// 121105 -- uncompressed
