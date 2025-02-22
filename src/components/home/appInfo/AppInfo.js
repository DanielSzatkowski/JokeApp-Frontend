import React from "react";
import { Container, Row } from "react-bootstrap";
import CardElement from "../cardElement";
import worldIcon from "../../../img/earth-globe.png";
import userFriendlyIcon from "../../../img/user-friendly.png";

function AppInfo(props){
    return(
        <Container fluid>
            <Row className="additional-info">
                <CardElement img={worldIcon} 
                    title={"The best community"}
                    content={"JokeApp make it easy to share jokes not only with your friends, but even with people you don't know! Join the community! It's really easy!"}
                />
                <CardElement img={userFriendlyIcon}
                    title={"User-friendly application"}
                    content={"JokeApp is really user-friendly. So, it's easy to register and use! You don't have to waste hours just to understand how interface work!"}
                />
            </Row>
        </Container>
    );
}

export default AppInfo;