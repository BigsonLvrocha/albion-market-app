import { hello } from ".";

describe("hello", () => {
  it("returns 'world'", () => {
    expect(hello()).toBe("world")
  })
})
