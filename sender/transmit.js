'use strict'

const request = require('request')
const zlib = require('zlib');
/*
*  This function will be called for each event.  (eg: for each sensor reading)
*  Modify it as needed.
*/

/*
   sending data with zgip compression using
*/

module.exports = function(eventMsg, encoding, callback,REQUEST=request) {
  zlib.gzip(eventMsg, function (err, evtMsg) {
    if (err) {
      console.log("An error occured during compression");
      callback(err);
    } else {
      REQUEST.post('http://localhost:8080/event', {
          body: evtMsg,
          headers: {'Content-Encoding': 'gzip' }
        },
        (err, res, body) => {
          callback(err)
        })
    };
  })
}

