import React, { Component } from "react";
import Logo from '../Logo/Logo';
import './SearchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="section-searchbar searchbar">
           <Logo />
          <input type="text" className="searchbar__input u-center-middle u-margin-top-medium" placeholder="Search for an image..." />

      </section>
    );
  }
}

export default SearchBar;
