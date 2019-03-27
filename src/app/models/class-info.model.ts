export class ClassInfo {
  start: number;
  end: number;
  name: string;
  showing: boolean;
  day: Day;

  constructor(start: number, end: number, name: string, day: Day) {
    this.start = start;
    this.end = end;
    this.name = name;
    this.showing = false;
    this.day = day;
  }
}

export class ClassInfoArray {
  classInfo: ClassInfo[] = [];
}
export enum Day {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5
}
