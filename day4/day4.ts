import { DayFunction, StarFunction } from "../types";
import { readFile } from "../utils";

export const day4: DayFunction<number> = (star) => (file) =>
  star === 1 ? star1(file) : star2(file);

const prepareBingoFields = (file: string): number[][][] => {
  const input = readFile(file).split("\n\n");
  const fieldsString = input
    .slice(1)
    .map((el) => el.split("\n"))
    .map((b) =>
      b.map((line) =>
        line
          .split("  ")
          .map((el) => el.split(" "))
          .flat()
          .filter(Boolean)
      )
    );
  return fieldsString.map((b) => b.map((line) => line.map((el) => Number(el))));
};
const prepareBingoNumbers = (file: string): number[] => {
  const input = readFile(file).split("\n\n");
  return input[0].split(",").map((el) => Number(el));
};
const star1: StarFunction<number> = (file: string) => {
  const inputFields = prepareBingoFields(file);
  const inputNumbers = prepareBingoNumbers(file);

  for (const nr of inputNumbers) {
    inputFields.map((field) =>
      field.map((line) => {
        const index = line.findIndex((el) => el === nr);
        line[index] = -1;
      })
    );
    const bingo = checkBingo(inputFields);
    if (bingo !== -1) {
      return (
        inputFields[bingo]
          .map((line) => line.filter((el) => el !== -1))
          .flat()
          .reduce((acc, el) => acc + el, 0) * nr
      );
    }
  }
  return 0;
};

const checkBingo = (fields: number[][][]): number => {
  return fields.findIndex(
    (field) =>
      field.some((line) => line.every((el) => el === -1)) ||
      field[0]
        .map((_, colIndex) => field.map((row) => row[colIndex]))
        .some((line) => line.every((el) => el === -1))
  );
};

const star2: StarFunction<number> = (file: string) => {
  const inputFields = prepareBingoFields(file);
  const inputNumbers = prepareBingoNumbers(file);

  for (const nr of inputNumbers) {
    inputFields.forEach((field) =>
      field.forEach((line) => {
        const index = line.findIndex((el) => el === nr);
        if (index !== -1) {
          line[index] = -1;
        }
      })
    );

    while (true) {
      const bingo = checkBingo(inputFields);
      if (bingo !== -1) {
        if (inputFields.length === 1) {
          return (
            inputFields[0]
              .map((line) => line.filter((el) => el !== -1))
              .flat()
              .reduce((acc, el) => acc + el, 0) * nr
          );
        }
        inputFields.splice(bingo, 1);
      } else {
        break;
      }
    }
  }
  return 0;
};
