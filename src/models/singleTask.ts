import { Timestamp } from "firebase/firestore";

export interface SingleTaskModel {
  task: string;
  nextTime: Timestamp;
  days: string[];
}
