import { Timestamp } from "@firebase/firestore";

export interface ActivitiesModel {
  nextTime: Timestamp;
  task: string;
}
