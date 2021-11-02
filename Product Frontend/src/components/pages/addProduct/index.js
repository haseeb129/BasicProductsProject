import React, { useState } from "react";
import { axiosInstanse } from "../../../apiRequest";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
const AddProduct = () => {
  let history = useHistory();
  const [state, setState] = useState({
    briefDescription: "",
    detailedDescription: "",
    price: "",
    originalPrice: "",
    link: "",
    file: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onFileChange = (event) => {
    setState({ ...state, file: event.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let element of Object.keys(state)) {
      formData.append([element], state[element]);
    }

    await axiosInstanse
      .post("products/addProduct", formData)
      .then(async (response) => {
        toast.success("Added Successful");
        window.location = "/";
      })
      .catch((err) => {
        toast.error(
          `ERROR
          ${err?.response?.data?.message || "Something went wrong"}`
        );
      });
  };
  return (
    <div>
      <Form className="inner" onSubmit={handleSubmit}>
        <h3>Add Product</h3>
        <Container fluid className="p-0">
          <Row>
            <Col md={6} xs={6}>
              <Form.Group controlId="">
                <Form.Label>Brief Description</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  required
                  name="briefDescription"
                  value={state.briefDescription}
                  placeholder="Enter Brief Description"
                  minLength={10}
                />
              </Form.Group>
            </Col>
            <Col md={6} xs={6}>
              <Form.Group controlId="">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={onFileChange}
                  required
                  name="image"
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>

        <Container fluid className="p-0">
          <Row>
            <Col md={6} xs={6}>
              <Form.Group controlId="">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  required
                  name="price"
                  value={state.price}
                  placeholder="Enter Price"
                  min={10}
                />
              </Form.Group>
            </Col>
            <Col md={6} xs={6}>
              <Form.Group controlId="">
                <Form.Label>Original Price</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  required
                  name="originalPrice"
                  value={state.originalPrice}
                  placeholder="Enter Original Price"
                  min={10}
                />
              </Form.Group>
            </Col>
          </Row>
        </Container>

        <Form.Group controlId="">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            required
            name="link"
            value={state.link}
            placeholder="Enter Link"
            minLength={10}
          />
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Detailed Description</Form.Label>
          <Form.Control
            as="textarea"
            onChange={handleChange}
            required
            style={{ height: "100px" }}
            name="detailedDescription"
            value={state.detailedDescription}
            placeholder="Enter Detailed Description"
            minLength={10}
          />
        </Form.Group>
        <Container fluid>
          <Row>
            <Col md={6} xs={6} className="p-1">
              <Button type="submit" variant="success" block size="lg">
                Submit
              </Button>
            </Col>
            <Col md={6} xs={6} className="p-1">
              <Button
                variant="danger"
                block
                size="lg"
                onClick={() => history.push("/")}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>

        <ToastContainer />
      </Form>
    </div>
  );
};

export default AddProduct;
