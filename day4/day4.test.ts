import { day4 } from "./day4";
import path from "path";

describe("evaluate the bingo game input", () => {
  it("and return the sum of the remaining numbers multiplied by the last game number from the first winning field", () => {
    expect(day4(1)(path.join("day4", "testInput"))).toBe(4512);
  });
  it("and retrun the result from the last field to win", () => {
    expect(day4(2)(path.join("day4", "testInput"))).toBe(1924);
  });
});
