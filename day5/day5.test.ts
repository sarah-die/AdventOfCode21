import path from "path";
import { day5 } from "./day5";

describe("evaluate the coordinates", () => {
  it("and return the sum of those who doubled", () => {
    expect(day5(1)(path.join("day5", "testInput"))).toBe(5);
  });
  it("and return the sum of those who doubled on star 2", () => {
    expect(day5(2)(path.join("day5", "testInput"))).toBe(12);
  });
});
