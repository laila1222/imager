import React, { Component } from "react";
import Home from './pages/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./css/style.css";


class App extends Component {
  constructor(props) {
    super(props);

  }

 

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;
