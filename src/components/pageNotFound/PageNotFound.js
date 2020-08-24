import React from "react";
import {Alert, Container} from "react-bootstrap";


function PageNotFound(props) {
    return(
        <Container className="pt-5">
            <Alert variant="danger">
                <Alert.Heading>404 Page Not Found!</Alert.Heading>
                <p>
                    Page you wanted to display doesn't exist!
                </p>
            </Alert>
        </Container>
    );
}

export default PageNotFound;