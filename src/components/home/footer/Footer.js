import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import githubIcon from "../../../img/github.png";
import linkedinIcon from "../../../img/linkedin.png";


function Footer(props){
    return(
        <Container fluid>
            <Row className="footer pt-5 pb-5 justify-content-center">
                <Col className="justify-content-center text-center">
                    <a href="https://github.com/DanielSzatkowski" rel="noopener noreferrer">
                        <Image src={githubIcon}></Image>
                    </a>
                    <a href="https://pl.linkedin.com/in/daniel-szatkowski" rel="noopener noreferrer">
                        <Image src={linkedinIcon}></Image>
                    </a>
                {/* </Col>
                <Col md={6}> */}
                    <a href="https://github.com/DamianSzatkowski" rel="noopener noreferrer">
                        <Image src={githubIcon}></Image>
                    </a>
                    <a href="https://pl.linkedin.com/in/damian-szatkowski" rel="noopener noreferrer">
                        <Image src={linkedinIcon}></Image>
                    </a>
                </Col>
            </Row>
            <Row className="footer justify-content-center text-center pb-5">
                Authors: <br />
                Daniel Szatkowski (danielszatkowski432@gmail.com)<br />
                Damian Szatkowski (damianszatkowski387@gmail.com)
            </Row>
        </Container>
    );
}


export default Footer;