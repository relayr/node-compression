const transmit = require("../transmit");
const zlib = require("zlib");
const expect = require('chai').expect;
const fs=require('fs');
const eventMsg = fs.readFileSync("../sample_event_stream.log");
let compressgzipEventMsg = zlib.gzipSync(eventMsg);


describe("transmit test suit", () => {
    describe("should compress correctly", () => {
        let compressEventMsgBody = null;
        const req = {
            post: async (...args) => {
                compressEventMsgBody = args[1].body;
                args[2]();
            }
        };
        const callback = (e) => {
            //comparing compression 
            expect(compressgzipEventMsg).toStrictEqual(compressEventMsgBody);
        };
        it("compression test in body", () => {
            
            transmit(eventMsg, null, callback, req);
        })

        it("compression ratio",()=>{
            oriStrLen=new Buffer.from(eventMsg).length;
            comStrLen=compressgzipEventMsg.length
            console.log("compression = ~",Math.floor((100*(comStrLen/oriStrLen))),"% less")
            expect(oriStrLen).to.greaterThan(comStrLen);
        })
    });
});