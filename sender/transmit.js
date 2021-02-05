"use strict";

const got = require("got");
const { brotliCompress } = require("zlib");

/*
 *  This function will be called for each event.  (eg: for each sensor reading)
 *  Modify it as needed.
 */
module.exports = function transmitData(
  eventMsg,
  encoding,
  callback,
  GOT = got // making it testable
) {
  brotliCompress(eventMsg, async function (err, buffer) {
    if (err) {
      console.log("An error occured while performing compression");
      callback(err);
    }
    GOT.post("http://localhost:8080/event", {
      body: buffer,
      decompress: false,
    })
      .then((resp) => {
        // console.log(resp.headers, resp.body);
        callback();
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      });
  });
};
