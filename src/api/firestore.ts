import {
  getDocs,
  getFirestore,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { UserModel } from "../models/user";

class Firestore {
  db;

  constructor() {
    this.db = getFirestore();
  }

  private async getUsers(): Promise<UserModel[]> {
    const querySnapshot = await getDocs(collection(this.db, "users"));
    let result = [];
    querySnapshot.docs.forEach((v) => {
      result = [v.data(), ...result];
    });
    return result;
  }

  public async getUser(): Promise<UserModel> {
    const userSnapshot = await this.getUsers();
    let user = userSnapshot[0];
    user["preferred-activities"] = user["preferred-activities"].sort(
      (a, b) => a.nextTime.seconds - b.nextTime.seconds
    );
    console.log("Sorted user", user);
    return user;
  }

  public async updateUser(u: UserModel) {
    // const userRef = doc(this.db, "users", "apfsg3MRcUdbJgA6KJgP");
    // await updateDoc(userRef, u);
  }
}

export default Firestore;
