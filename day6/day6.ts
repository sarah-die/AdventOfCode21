import { DayFunction, StarFunction } from "../types";
import { readFile } from "../utils";

export const day6: DayFunction<number> = (star) => (file) =>
  star === 1 ? star1(file) : star2(file);

const prepareInputData = (file: string): number[] => {
  return readFile(file)
    .split(",")
    .map((el) => Number(el));
};

const newFish = (fish: number[]): number[] => {
  let temp = 0;
  const nextDayFish = fish.map((f) => {
    if (f === 0) {
      temp++;
      return f + 6;
    } else {
      return f - 1;
    }
  });
  for (let i = 0; i < temp; i++) {
    nextDayFish.push(8);
  }
  return nextDayFish;
};

const star1: StarFunction<number> = (file: string) => {
  let input = prepareInputData(file);
  let days: number = 0;
  while (days < 80) {
    let temp = [...input];
    input = [...newFish(temp)];
    days++;
  }
  return input.length;
};

const star2: StarFunction<number> = (file: string) => {
  const input = prepareInputData(file);
  const daysUntilBaby: number[] = new Array(9).fill(0);
  input.forEach((f) => {
    daysUntilBaby[f]++;
  });
  let day = 0;
  while (day < 256) {
    const babies = daysUntilBaby.shift() || 0;
    daysUntilBaby[6] += babies;
    daysUntilBaby[8] = babies;
    day++;
  }
  return daysUntilBaby.reduce((acc, cur) => acc + cur, 0);
};
