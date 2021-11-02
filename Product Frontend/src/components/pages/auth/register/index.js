import React, { Component } from "react";
import "../auth.css";
import auth from "../authService";
import { Button, Form } from "react-bootstrap/";
import GoogleAccount from "../googleLogin";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstanse } from "../../../../apiRequest";
export default class Register extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    const userObject = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    };

    await axiosInstanse
      .post("auth/signup", userObject)
      .then(async (response) => {
        toast.success("SignUp Successful");
        await auth.logout();
        await auth.loginWithJWT(response.data.token);
        window.location = "/";
      })
      .catch((err) => {
        toast.error(
          `ERROR
          ${err?.response?.data?.message || "Something went wrong"}`
        );
      });
  };
  render() {
    return (
      <div>
        <Form className="inner" onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>
          <Form.Group controlId="">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChange}
              required
              name="userName"
              value={this.state.userName}
              placeholder="Enter UserName"
              minLength={3}
            />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={this.handleChange}
              required
              name="email"
              value={this.state.email}
              placeholder="Enter Email"
              minLength={3}
            />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={this.handleChange}
              required
              name="password"
              value={this.state.password}
              placeholder="Enter Password"
              minLength={3}
            />
          </Form.Group>
          <Button type="submit" className="btn btn-dark btn-lg btn-block">
            Register
          </Button>
          <ToastContainer />
          <div className="middleGoogleButton">
            <GoogleAccount />
          </div>
        </Form>
      </div>
    );
  }
}
