import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import _ from "lodash";
const ProductView = (props) => {
  let history = useHistory();

  console.log("Props ProductView", props);
  const [state, setState] = useState({
    briefDescription: "55",
    detailedDescription: "55",
    price: "55",
    originalPrice: "555",
    link: "55",
    productImage: "",
    created_by: { userName: "" },
  });
  useEffect(() => {
    if (_.isEmpty(props?.location?.state)) return history.push("/");
    return setState(props?.location?.state);
  }, []);

  return (
    <div>
      <Form className="inner productViewWrapper">
        <h3>Product View</h3>
        <Container fluid className="p-0">
          <Row>
            <Col md={4}>
              <div className="imageWrapper">
                <img src={state.productImage} alt="" />
              </div>
            </Col>
            <Col md={8}>
              <Row>
                <Col md={6} xs={6}>
                  <Form.Group controlId="">
                    <Form.Label>Brief Description</Form.Label>
                    <br />
                    <span>{state.briefDescription}</span>
                  </Form.Group>
                </Col>
                <Col md={6} xs={6}>
                  <Form.Group controlId="">
                    <Form.Label>Created_By</Form.Label>
                    <br />
                    <span>{state?.created_by?.userName}</span>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6} xs={6}>
                  <Form.Group controlId="">
                    <Form.Label>Price</Form.Label>
                    <br />
                    <span>{state.price}</span>
                  </Form.Group>
                </Col>
                <Col md={6} xs={6}>
                  <Form.Group controlId="">
                    <Form.Label>Original Price</Form.Label>
                    <br />
                    <span>{state.originalPrice}</span>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="">
                <Form.Label>Link</Form.Label>
                <br />
                <span>{state.link}</span>
              </Form.Group>
              <Form.Group controlId="">
                <Form.Label>Detailed Description</Form.Label>

                <br />
                <span>{state.detailedDescription}</span>
              </Form.Group>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row>
            <Col md={6} xs={6} className="p-0">
              <Button
                variant="warning"
                block
                size="lg"
                className="mt-1"
                onClick={() => history.push("/")}
              >
                Back
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default ProductView;
