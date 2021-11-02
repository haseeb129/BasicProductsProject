import React, { Component } from "react";
import "../auth.css";
import auth from "../authService";
import { Button, Form } from "react-bootstrap/";
import { toast, ToastContainer } from "react-toastify";
import { axiosInstanse } from "../../../../apiRequest";
import GoogleAccount from "../googleLogin";

export default class SignUp extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const userObject = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log("User Object", userObject);
    await axiosInstanse
      .post("auth/login", userObject)
      .then(async (response) => {
        toast.success("SignIn Successful");
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
          <h3>Sign In</h3>
          <Form.Group controlId="">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              onChange={this.handleChange}
              required
              name="email"
              value={this.state.email}
              placeholder="Enter email"
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
            Sign In
          </Button>
          <ToastContainer />
          <div className="middleGoogleButton">
            <GoogleAccount />
          </div>
          <br />
        </Form>
      </div>
    );
  }
}
