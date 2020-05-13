import React, { Component } from "react";
import Logo from "../Logo/Logo";
import "./SearchBar.scss";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value},  () => {
      console.log(this.state.inputValue);
    });
  }

  // On change in input field change inputValueState, and call handler function with the inputValue
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handler(this.state.inputValue);

  };

  render() {
    return (
      <section className="section-searchbar searchbar">
        <Logo />
        <form className="searchbar__form" onSubmit={this.handleOnSubmit}>
        <input
          type="text"
          className="searchbar__input u-center-middle u-margin-top-medium"
          placeholder="Search for an image..."
          onChange={this.handleInputChange}
          name="inputValue"
          
        />

        </form>
        
      </section>
    );
  }
}

export default SearchBar;
