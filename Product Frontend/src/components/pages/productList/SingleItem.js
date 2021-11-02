import React from "react";
import { Row, Col } from "react-bootstrap";

const SingleItem = (props) => {
  return (
    <Row
      onClick={() =>
        props?.history?.push({ pathname: "/ProductView", state: props.element })
      }
      className="singleItmeWrapper"
    >
      <Col md={3}>
        <div className="singleRow mb-2">
          <img src={props.element.productImage} alt="" className="rowImage" />
        </div>
      </Col>
      <Col md={4} xs={6} className="singleRowWrapper">
        <div>
          <div>
            Price : <span>{props.element.price}</span>
          </div>
          <div>
            Website : <span>{props.element.link}</span>
          </div>
          <div>
            Created_by : <span>{props.element.created_by.userName}</span>
          </div>
        </div>
      </Col>

      <Col md={5} xs={6} className="singleRowWrapper">
        Brief Description : <span>{props.element.briefDescription}</span>
      </Col>
    </Row>
  );
};

export default SingleItem;
