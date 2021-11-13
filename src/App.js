import React, { useEffect, useState } from "react";
import Test from "./components/Test";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Firestore from "./api/firestore";

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
  const [user, setUser] = useState();

  const loadUsers = async () => {
    const fireStore = new Firestore();
    setUser(await fireStore.getUser());
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
          <Test />
          {user && <p>{user.displayname}</p>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
