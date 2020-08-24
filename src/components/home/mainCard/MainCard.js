import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";


function MainCard(props) {

    return (
        <Container fluid className="main-container">
            <Row className="justify-content-center">
                <h1> JokeApp </h1>
            </Row>
            <Row className="justify-content-center pb-3"><h2> Application for sharing jokes with others! </h2></Row>
            <Row className="justify-content-center"><h5>Share the jokes and let others do the same! It's easy with JokeApp!</h5></Row>
            <Row className="justify-content-center">
                <Col className="d-flex justify-content-center pt-5">
                    <Button
                        variant="outline-info"
                        size="lg"
                        className="mr-3"
                        href="/login"
                    >
                        Log in!
                    </Button>
                    <Button
                        variant="outline-light"
                        size="lg"
                        className="ml-3"
                    //TODO add registration href
                    >
                        Sign up!
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default MainCard;