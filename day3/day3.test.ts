import { day3 } from "./day3";
import path from "path";

describe("validate the diagnostic report", () => {
  it("and return ratings in decimal", () => {
    expect(day3(2)(path.join("day3", "testInput"))).toBe(230);
  });
});
