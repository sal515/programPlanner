import {Sequence} from "./sequence.model";
import {CourseHistory} from "./courseHistory.model";

export class StudentProfile {
  id: string;
  courseHistory: string[];
  fallSequence: string[];
  winterSequence: string[];
  summerSequence: string[];
  coop: boolean;
  completedCredits: number;
}
