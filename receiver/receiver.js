"use strict";

const { createBrotliDecompress } = require("zlib");
const { stdout } = require("process");
const { Transform } = require("stream");
// let totalBytes = 0;

module.exports = function decompressAndPrint(req, res, STDOUT = stdout) {
  req
    .on("end", () => {
      // totalBytes += req.socket.bytesRead; //for benchmarking purposes
      res.end();
    })
    .pipe(createBrotliDecompress())
    .on("error", (err) => {
      if (err) {
        console.log("An errorr Occured while decompressing");
      }
    })
    .pipe(
      new Transform({
        objectMode: true,
        transform: (chunk, encoding, callback) => {
          return chunk ? callback(null, `${chunk}\n`) : callback();
        },
      })
    )
    .pipe(STDOUT);
};
