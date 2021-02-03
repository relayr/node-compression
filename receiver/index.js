'use strict'

/*
*  Modify this file as needed.
*/

const http = require('http')

process.on('SIGTERM', function() {
  process.exit(0)
})

const server = http.createServer(function(req, res) {
  let body = []
  req.on('data', body.push.bind(body))
  req.on('end', () => {
    // just print to stdout
    console.log(Buffer.concat(body).toString())
    res.end()
  })
})

server.listen(8080)
