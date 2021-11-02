import React, { Component } from "react";
import Layout from "./components/layout";
import { axiosInstanse } from "./apiRequest";
import { toast, ToastContainer } from "react-toastify";

class App extends Component {
  state = {
    productsItems: [],
  };
  async componentDidMount() {
    await axiosInstanse
      .get("products/getAllProducts")
      .then(async (response) => {
        console.log("response", response);
        this.setState({ productsItems: response?.data?.products });
      })
      .catch((err) => {
        toast.error(
          `ERROR
      ${err?.response?.data?.message || "Something went wrong"}`
        );
      });
  }

  render() {
    return (
      <>
        <Layout state={this.state} />;
        <ToastContainer />
      </>
    );
  }
}

export default App;
