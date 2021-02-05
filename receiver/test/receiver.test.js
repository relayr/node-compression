const { brotliCompressSync } = require("zlib");
const { Readable, Writable, PassThrough } = require("stream");
const decompressAndPrint = require("../receiver");

describe("Testing sender module", () => {
  test("should decompress and print correctly", (done) => {
    const stringToCompress = "May the force be with you!";
    let compressdString = brotliCompressSync(stringToCompress);

    const req = Readable.from([compressdString]);
    const res = Writable({
      read(size) {},
    });
    const stdout = new PassThrough({ objectMode: true });

    const dataBuffer = [];
    stdout.on("data", (data) => {
      dataBuffer.push(Buffer.from(data));
    });
    stdout.on("finish", () => {
      expect(`${stringToCompress}\n`).toEqual(
        Buffer.concat(dataBuffer).toString()
      );
      done();
    });
    decompressAndPrint(req, res, stdout);
  });
});
