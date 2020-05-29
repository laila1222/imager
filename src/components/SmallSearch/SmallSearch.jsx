import React, { Component } from "react";
import Logo from "../Logo/Logo";
import { withRouter } from "react-router-dom";
import CreatedBy from "../CreatedBy/CreatedBy";
import "./SmallSearch.scss";

class SmallSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: "" };
  }

  // Change state.inputValue when user types in input field
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // On submit call inputHandler function with the inputValue
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.history.push(`/photos?search=${this.state.inputValue}`);
    this.props.inputHandler();
  };

  render() {
    return (
      <div className="smallSearch">
        <Logo />
        <CreatedBy />
        <form className="smallSearch__form" onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            className="smallSearch__input"
            placeholder="Search for an image"
            onChange={this.handleInputChange}
            name="inputValue"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(SmallSearch);
