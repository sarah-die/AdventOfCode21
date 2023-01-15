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

// commonIndex = 1 (mostCommon), = 0 (leastCommon)
const determineCommon = (
  input: string[],
  index: number,
  commonIndex: number
): string[] => {
  const eachPart = (i: number) => (acc: number, cur: string) =>
    acc + Number(cur[i]);
  const sum: number = input.reduce(eachPart(index), 0);
  if (commonIndex === 1) {
    const common = sum < input.length / 2 ? 0 : 1;
    return input.filter((el) => Number(el[index]) === common);
  } else {
    const uncommon = sum < input.length / 2 ? 1 : 0;
    return input.filter((el) => Number(el[index]) === uncommon);
  }
};

const star2: StarFunction<number> = (file: string) => {
  let inputOxygen = prepareInput(file);
  let inputo2 = [...inputOxygen];
  let index: number = 0;

  while (inputOxygen.length > 1) {
    inputOxygen = determineCommon(inputOxygen, index, 1);
    index++;
  }
  index = 0;
  while (inputo2.length > 1) {
    inputo2 = determineCommon(inputo2, index, 0);
    index++;
  }

  return parseInt(inputOxygen[0], 2) * parseInt(inputo2[0], 2);
};
