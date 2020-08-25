import React from "react";
import { Container, Card, Button, Row } from "react-bootstrap";


function ContentCard(props) {
    return (
        <Container fluid className="px-5 py-2 justify-content-center text-center">
            <Card className="bg-info">
                <Card.Body>
                    <Card.Title> {props.title} </Card.Title>
                    <Card.Text> {props.content} </Card.Text>
                    { props.authorName ? (
                        <Button className="mx-1 mb-1"> Visit "{props.authorName}" profile </Button> //TODO add href
                    ) : (<></>)
                    }
                    { props.comments ? (
                        <Button className="mx-1 mb-1"> Show comments </Button>  //TODO add href
                    ) : (<></>)
                    }
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ContentCard;