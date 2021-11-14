import React, { useEffect, useState } from "react";
import PetCanvas from "./components/PetCanvas";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Firestore from "./api/firestore";
import TaskList from "./components/TaskList";
import TopThree from "./components/TopThree";
import { UserModel } from "./models/user";
import TaskPrompt from "./components/TaskPrompt";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5kgLAtAFkz_H_JmUVLmh9Bfelxp2j9Eg",
  authDomain: "tama-got-u.firebaseapp.com",
  databaseURL: "https://tama-got-u-default-rtdb.firebaseio.com",
  projectId: "tama-got-u",
  storageBucket: "tama-got-u.appspot.com",
  messagingSenderId: "623580727299",
  appId: "1:623580727299:web:6877898a72348f7c806636",
  measurementId: "G-T081PZDCJ4",
};

function App() {
  const [user, setUser] = useState<undefined | UserModel>();

  const loadUsers = async () => {
    const fireStore = new Firestore();
    const temp = (await fireStore.getUser()) as UserModel;
    setUser(temp);
  };

  useEffect(() => {
    // Initialize Firebase
    initializeApp(firebaseConfig);
    loadUsers();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <PetCanvas />
          <div style={{ position: "relative" }}>
            <TaskList data={user && user["preferred-activities"]} />
          </div>
          <TaskPrompt />
          <TopThree />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
