import React, { Component } from "react";
import HomePage from './pages/HomePage';
import PhotosPage from './pages/PhotosPage';

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
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/photos">
            <PhotosPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
