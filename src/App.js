import React from "react";
import Test from "./components/Test";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Test />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
