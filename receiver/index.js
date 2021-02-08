'use strict'

/*
 *  Modify this file as needed.
 */

const http = require('http');
const zlib = require('zlib');

//const fs = require('fs');
//let totalBytesReceived = 0

process.on('SIGTERM', function () {
  process.exit(0)
})

const server = http.createServer(function (req, res) {
  req.on('end', () => {
    //for checking total received bytes
    //totalBytesReceived += req.socket.bytesRead;
    //fs.writeFileSync('./bytesReceived.txt', totalBytesReceived + "\n", 'utf8');
    // console.log(body)
    res.end()
  }).on('data', (message) => {
    /* 
      received data using gzip compression 
    */
    // console.log(zlib.gunzipSync(message).toString());
    /* 
      received data using brotli compression 
    */
    console.log(zlib.brotliDecompressSync(message).toString());

  }).on('error', (err) => {
    console.log(`An error Occured ${err}`);
  })
})

server.listen(8080)