import { ActivitiesModel } from "./activites";
import { PetModel } from "./pet";

export interface UserModel {
  displayname: string;
  email: string;
  pet: PetModel;
  "preferred-activities": ActivitiesModel[];
}
