import path from "path";
import { day6 } from "./day6";

describe("validate the exponential grow of lanternfish", () => {
  it("and return the amount of fish after 80 days", () => {
    expect(day6(1)(path.join("day6", "testInput"))).toBe(5934);
  });
  it("and return the amount of fish after 256 days", () => {
    expect(day6(2)(path.join("day6", "testInput"))).toBe(26984457539);
  });
});
