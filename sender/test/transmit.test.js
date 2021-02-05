const transmit = require("../transmit");
const { brotliDecompressSync } = require("zlib");

describe("Testing sender module", () => {
  test("should compress correctly", (done) => {
    const stringToCompress = "May the force be with you!";
    let compressdString = null;
    const got = {
      post: async (url, opt) => {
        compressdString = opt.body;
      },
    };

    const callback = () => {
      expect(stringToCompress).toStrictEqual(
        brotliDecompressSync(compressdString).toString()
      );
      done();
    };
    transmit(stringToCompress, null, callback, got);
  });

  test("should post data to server", (done) => {
    const got = {
      post: jest.fn(async () => {}),
    };

    const callback = () => {
      expect(got.post.mock.calls.length).toBe(1);
      done();
    };
    transmit("This is the way!", null, callback, got);
  });
});
