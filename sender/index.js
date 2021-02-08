'use strict'

/*
* !Important!
* Do not modify the interface(s) in this file.
* Minor adjustments are permitted.
*/

const Transform = require('stream').Transform
const PassThrough = require('stream').PassThrough

const transmit = require('./transmit')

const parseAndDelay = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    if(chunk === '') return callback()
    // set the a delay between 0 and 1000 ms
    // as no parsing is required so removed try catch
    let delay = Math.round(Math.random() * 1000)
    setTimeout(() => callback(null, chunk), delay)
  }
})

process.stdin
  .pipe(require('split')())
  .pipe(parseAndDelay)
  .pipe(new PassThrough({
    objectMode: true,
    transform: transmit
  }))
  .on('error', console .error)
  .on('finish', () => console.log('End of stream'))
