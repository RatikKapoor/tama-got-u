import { PetModel } from "./pet";
import { SingleTaskModel } from "./singleTask";

export interface UserModel {
  displayname: string;
  email: string;
  pet: PetModel;
  "preferred-activities": SingleTaskModel[];
}
