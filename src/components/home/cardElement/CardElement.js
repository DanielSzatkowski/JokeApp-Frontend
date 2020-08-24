import React from "react";
import { Col, Row, Image } from "react-bootstrap";


function CardElement(props){

    return(
        <Col>
            <Row className="justify-content-center pb-3">
                <Image src={props.img}></Image>
            </Row>
            <Row className="justify-content-center text-center px-5">
                <h3> {props.title} </h3>
            </Row>
            <Row className="justify-content-center text-center px-5">
                {props.content}
            </Row>
        </Col>
    );
}

export default CardElement;