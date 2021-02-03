'use strict'

const request = require('request')

/*
*  This function will be called for each event.  (eg: for each sensor reading)
*  Modify it as needed.
*/
module.exports = function(eventMsg, encoding, callback) {
  request.post('http://localhost:8080/event', {json: true, body: eventMsg}, (err, res, body) => {
    callback(err)
  })
}
