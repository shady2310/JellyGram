import React, { Component } from "react";
import Confirmation from "../SignUpForm/Confirmation"
import PersonalDetails from "../SignUpForm/PersonalDetails"
import Success from "../SignUpForm/Success"
import UserDetails from "../SignUpForm/UserDetails"

export default class Signup extends Component {
  state = {
    step: 1,
    email: "",
    fullname: "",
    username: "",
    password: "",
    dateofbirth: "",
    photo: "",
    gender: "",
  };

  //Paso atras
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  //Siguiente paso
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  //handle cambios inputs
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      email,
      fullname,
      username,
      password,
      dateofbirth,
      photo,
      gender,
    } = this.state;
    const values = { email, fullname, username, password, dateofbirth, photo, gender };

    switch (step) {
      case 1:
          console.log(values);
        return <UserDetails nextStep={this.nextStep} handleChange={this.handleChange} values={values}/>;
      case 2:
        console.log(values);
        return <PersonalDetails prevStep={this.prevStep} handleChange={this.handleChange} values={values}/>;
    //   case 3:
    //     return <Confirmation prevStep={this.prevStep} handleChange={this.handleChange} values={values}/>;
    //   case 4:
    //     return <Success />;
      default:
      // nada
    }
    
    
  }
}