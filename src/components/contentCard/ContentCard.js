import React from "react";
import { Container, Card, Button, Row } from "react-bootstrap";
import "./contentcard.css";


function ContentCard(props) {
    return (
        <Container key={props.id} fluid className="px-5 py-2 justify-content-center text-center info-card">
            <Card className="bg-info">
                <Card.Body>
                    {props.title ? 
                        <Card.Title> {props.title} </Card.Title>
                        : null    
                    } 
                    
                    <Card.Text> {props.content} </Card.Text>
                    
                    {(props.categories) &&
                        (<text>
                            categories: {props.categories.join(", ")}
                        </text>)
                    }

                    { props.authorName ? (
                        <Button className="mx-1 mb-1" href={"/users/" + props.authorId}> Visit "{props.authorName}" profile </Button>
                    ) : (<></>)
                    }
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ContentCard;