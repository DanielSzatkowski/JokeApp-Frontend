import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import githubIcon from "../../../img/github.png";
import linkedinIcon from "../../../img/linkedin.png";


function Footer(props){
    return(
        <Container fluid>
            <Row className="footer pt-5 pb-3 justify-content-center">
                <Col className="text-right">
                    <a href="https://github.com/DanielSzatkowski" rel="noopener noreferrer">
                        <Image src={githubIcon}></Image>
                    </a>
                    <a href="https://pl.linkedin.com/in/daniel-szatkowski" rel="noopener noreferrer">
                        <Image src={linkedinIcon}></Image>
                    </a>
                </Col>
                <Col>
                    <a href="https://github.com/DamianSzatkowski" rel="noopener noreferrer">
                        <Image src={githubIcon}></Image>
                    </a>
                    <a href="https://pl.linkedin.com/in/damian-szatkowski" rel="noopener noreferrer">
                        <Image src={linkedinIcon}></Image>
                    </a>
                </Col>
            </Row>
            <Row className="footer justify-content-center">
                Daniel Szatkowski (danielszatkowski432@gmail.com)<br />
                Damian Szatkowski (damianszatkowski387@gmail.com)
            </Row>
        </Container>
    );
}


export default Footer;