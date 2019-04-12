export class ClassInfo {
  start: number;
  end: number;
  name: string;
  section: string;
  showing: boolean;
  day: number;

  constructor(start: number, end: number, name: string, section: string, day: number) {
    this.start = start;
    this.end = end;
    this.name = name;
    this.showing = false;
    this.day = day;
    this.section = section;
  }
}

export class ClassInfoArray {
  classInfo: ClassInfo[] = [];
}
