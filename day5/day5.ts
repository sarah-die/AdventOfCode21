import { DayFunction, StarFunction } from "../types";
import { readFile } from "../utils";

export const day5: DayFunction<number> = (star) => (file) =>
  star === 1 ? star1(file) : star2(file);

const prepareInputDay5 = (file: string): number[][] => {
  const input = readFile(file)
    .split("\n")
    .map((line) =>
      line
        .split(" -> ")
        .map((coordinates) => coordinates.split(","))
        .flat()
    );
  return input.map((l) => l.map((c) => Number(c)));
};

const findDoubledCoordinates1 = (input: number[][]): number => {
  let coordinates: number[][] = [];
  input.forEach((el) => {
    const varCoordinate = el[0] === el[2] ? "y" : "x";
    if (varCoordinate === "x" && el[1] !== el[3]) return;
    const x = [el[0], el[2]];
    const y = [el[1], el[3]];
    const start = varCoordinate === "x" ? Math.min(...x) : Math.min(...y);
    const end = varCoordinate === "x" ? Math.max(...x) : Math.max(...y);
    for (let i = start; i <= end; i++) {
      checkCoordinates(
        varCoordinate === "x" ? i : x[0],
        varCoordinate === "y" ? i : y[0],
        coordinates
      );
    }
  });
  return coordinates.flat().filter((el) => el >= 2).length;
};

const checkCoordinates = (x: number, y: number, coordinates: number[][]) => {
  if (coordinates[x]?.[y]) {
    coordinates[x][y] += 1;
  } else {
    if (!coordinates[x]) coordinates[x] = [];
    coordinates[x][y] = 1;
  }
};

const star1: StarFunction<number> = (file: string) => {
  return findDoubledCoordinates1(prepareInputDay5(file));
};

const findDoubledCoordinates2 = (input: number[][]): number => {
  let coordinates: number[][] = [];
  input.forEach((el) => {
    const [startX, startY, endX, endY] = el;
    let x = startX;
    let y = startY;
    checkCoordinates(x, y, coordinates);
    while (x !== endX || y !== endY) {
      x += Math.sign(endX - startX);
      y += Math.sign(endY - startY);
      checkCoordinates(x, y, coordinates);
    }
  });
  return coordinates.flat().filter((el) => el >= 2).length;
};

const star2: StarFunction<number> = (file: string) => {
  return findDoubledCoordinates2(prepareInputDay5(file));
};
