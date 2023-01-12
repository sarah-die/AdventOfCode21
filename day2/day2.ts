import { DayFunction, StarFunction } from "../types";
import { readFile } from "../utils";

export const day2: DayFunction<number> = (star) => (file) =>
  star === 1 ? star1(file) : star2(file);

type Input = ["forward" | "up" | "down", number][];
const prepareDay2Input = (file: string): Input => {
  return readFile(file)
    .split("\n")
    .map((el) => el.split(" ").map((n, i) => (i ? Number(n) : n)) as Input[0]);
};

const byDirection = (comp: Input[0][0]) => (el: Input[0]) => el[0] === comp;
const arraySum = (acc: number, cur: Input[0]) => acc + cur[1];

const star1: StarFunction<number> = (file: string) => {
  const input = prepareDay2Input(file);
  const forwardArr = input.filter(byDirection("forward"));
  // const forwardArr: Input = input.filter((el) => el[0] === "forward");
  const downArr = input.filter(byDirection("down"));
  const upArr = input.filter(byDirection("up"));

  const forwardSum = forwardArr.reduce(arraySum, 0);
  // const forwardSum = forwardArr.reduce((acc, cur) => acc + cur[1], 0);
  const downSum = downArr.reduce(arraySum, 0);
  const upSum = upArr.reduce(arraySum, 0);

  return forwardSum * Math.abs(downSum - upSum);
};

// wenn hor x: hor+x & depth: aim*x
// wenn up x: aim-x
// wenn down x: aim+x

const star2: StarFunction<number> = (file: string) => {
  const input = prepareDay2Input(file);
  let aim: number = 0;
  let hor: number = 0;
  let depth: number = 0;
  input.forEach((el) => {
    if (el[0] === "forward") {
      hor += el[1];
      depth += el[1] * aim;
    } else if (el[0] === "down") {
      aim += el[1];
    } else {
      aim -= el[1];
    }
  });
  return depth * hor;
};
