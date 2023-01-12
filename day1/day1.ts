import { prepareInput } from "../utils";
import { DayFunction, StarFunction } from "../types";

export const day1: DayFunction<number> = (star) => (file) =>
  star === 1 ? star1(file) : star2(file);

const star1: StarFunction<number> = (file) => {
  let result: number = 0;
  const input = prepareInput(file);
  input.forEach((l, index) => {
    if (Number(input[index - 1]) < Number(l)) {
      result++;
    }
  });
  return result;
};
const star2: StarFunction<number> = (file) => {
  let result: number = 0;
  const input: number[] = prepareInput(file).map((el) => Number(el));
  input.forEach((n, i) => {
    const sum1: number = input[i - 3] + input[i - 2] + input[i - 1];
    const sum2: number = input[i - 2] + input[i - 1] + n;
    if (sum1 < sum2) {
      result++;
    }
  });

  return result;
};
