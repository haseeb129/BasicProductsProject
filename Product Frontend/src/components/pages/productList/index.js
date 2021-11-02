import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import SingleItem from "./SingleItem";

const ProductList = (props) => {
  return (
    <div className="wordWrap">
      <div
        className="orangeBackground textCenter "
        style={{ padding: "20px", minHeight: "100vh" }}
      >
        <Container>
          <Row>
            <Col md={12}>
              <div className="singleRowWrapper">
                {props?.state?.productsItems.length > 0 ? (
                  props?.state?.productsItems?.map((element, index) => {
                    return (
                      <SingleItem element={element} {...props} key={index} />
                    );
                  })
                ) : (
                  <h3>No Product Available</h3>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ProductList;
