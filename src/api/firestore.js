import {
  getDocs,
  getDoc,
  getFirestore,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";

class Firestore {
  db;

  constructor() {
    this.db = getFirestore();
  }

  async getUsers() {
    const querySnapshot = await getDocs(collection(this.db, "users"));
    let result = [];
    querySnapshot.docs.forEach((v) => {
      result = [v.data(), ...result];
    });
    return result;
  }

  async getUser() {
    const userSnapshot = await this.getUsers();
    console.warn(userSnapshot);
    return userSnapshot[0];
  }

  async updateUser(u) {
    const userRef = doc(this.db, "users", "apfsg3MRcUdbJgA6KJgP");
    await updateDoc(userRef, u);
  }
}

export default Firestore;
