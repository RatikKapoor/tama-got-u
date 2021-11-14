import { Timestamp } from "@firebase/firestore";

export interface ActivitiesModel {
  lastCompleted: Timestamp;
  nextTime: Timestamp;
  task: string;
}
