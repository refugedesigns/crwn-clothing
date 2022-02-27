import React, { Component } from "react";
import FormInput from "../ui-components/form-input/FormInput";
import CustomButton from "../ui-components/custom-button/CustomButton";

import "./sign-in.styles.scss"

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      email: "",
      password: "",
    });
  };

  handleChange = event => {
      const { value, name } = event.target 

      this.setState({[name]: value})
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput label="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          <FormInput
            label="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <CustomButton type="submit">Sign in</CustomButton>
        </form>
      </div>
    );
  }
}
