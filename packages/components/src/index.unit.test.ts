import { hello } from './index';

describe('hello', () => {
  it("returns 'world'", () => {
    expect(hello()).toBe('world');
  });
});
