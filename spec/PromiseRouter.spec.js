var PromiseRouter = require("../src/PromiseRouter").default;

describe("PromiseRouter", () => {
  it("should properly handle rejects", (done) => {
    var router = new PromiseRouter();
    router.route("GET", "/dummy", ()=> {
      return Promise.reject({
        error: "an error",
        code: -1
      })
    }, () => {
      fail("this should not be called");
    });

    router.routes[0].handler({}).then((result) => {
      jfail(result);
      fail("this should not be called");
      done();
    }, (error)=> {
      expect(error.error).toEqual("an error");
      expect(error.code).toEqual(-1);
      done();
    });
  });
})
