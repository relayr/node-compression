const transmit = require("../transmit");
const zlib = require("zlib");
const expect = require('chai').expect;


const eventMsg = '[{"bn":"amb1/modbus/agg1-strom/","bt":1480001428.058},{"n":"V a-n","v":230.7759552001953,"u":"V"},{"n":"V b-n","v":230.7440948486328,"u":"V"},{"n":"V c-n","v":230.74256896972656,"u":"V"},{"n":"I a","v":2.918856382369995,"u":"A"},{"n":"I b","v":2.7666494846343994,"u":"A"},{"n":"I c","v":2.7530789375305176,"u":"A"},{"n":"P a","v":442.8495788574219,"u":"W"},{"n":"P b","v":415.97491455078125,"u":"W"},{"n":"P c","v":400.436767578125,"u":"W"},{"n":"MP a","v":637.7411499023438,"u":"W"},{"n":"MP b","v":606.9644165039062,"u":"W"},{"n":"MP c","v":587.9564819335938,"u":"W"}]';

let compressgzipEventMsg = zlib.gzipSync(eventMsg);
let compressbrotliEventMsg = zlib.brotliCompressSync(eventMsg);


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
            expect(compressbrotliEventMsg).toStrictEqual(compressEventMsgBody);
        };
        it("compression in body sent", () => {
            transmit(eventMsg, null, callback, req);
        })

        it("compression ratio gzip",()=>{
            oriStrLen=new Buffer.from(eventMsg).length;
            comStrLen=compressgzipEventMsg.length
            console.log("compression = ~",Math.floor((100*(1-comStrLen/oriStrLen))),"%")
            expect(oriStrLen).to.greaterThan(comStrLen);
            
        })

        it("compression ratio brotli",()=>{
            let oriStrLen=new Buffer.from(eventMsg).length;
            let comStrLen=compressbrotliEventMsg.length;
            console.log("compression = ~",Math.floor((100*(1-comStrLen/oriStrLen))),"%")
            expect(oriStrLen).to.greaterThan(comStrLen);
        })
    });
});