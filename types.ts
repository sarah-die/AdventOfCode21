export type StarFunction<ReturnValue extends unknown> = (file: string) => ReturnValue;
export type DayFunction<ReturnValue extends unknown> = (star: 1 | 2) => StarFunction<ReturnValue>;

