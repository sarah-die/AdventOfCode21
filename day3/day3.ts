import { DayFunction, StarFunction } from "../types";
import { prepareInput } from "../utils";

export const day3: DayFunction<number> = (star) => (file) =>
  star === 1 ? star1(file) : star2(file);

const star1: StarFunction<number> = (file: string) => {
  const input = prepareInput(file);
  const eachPart = (i: number) => (acc: number, cur: string) =>
    acc + Number(cur[i]);
  const sum: number[] = input[0]
    .split("")
    .map((_, index) => input.reduce(eachPart(index), 0));
  return (
    parseInt(sum.map((el) => (el < input.length / 2 ? 0 : 1)).join(""), 2) *
    parseInt(sum.map((el) => (el < input.length / 2 ? 1 : 0)).join(""), 2)
  );
};

const star2: StarFunction<number> = (file: string) => {
  prepareInput(file);

  return 0;
};
