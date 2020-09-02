import React, {Component} from "react";
import { Container, Row, Col, Button} from 'react-bootstrap';
import ContentCard from '../contentCard';
import { UserSignature } from '../userInfo';
import jokesServ from '../../services/jokesServ';
import userServ from '../../services/userServ';
import commentsServ from "../../services/commentsServ";
import CommentsList from "../commentsList";
import "../../index.css";

class JokeInfo extends Component {
    state = {
        joke: {
            id: '',
            content: '',
            creator: '',
            categories: [],
            comments: []
        }
    }

    componentDidMount() {
        jokesServ.getJoke(this.props.match.params.id).then((jokeResp) => {
            this.setState({
                joke: jokeResp.data
            });

        }).catch((err) => {
            console.log(err);
            window.alert("Cannot download joke!");
        });
    }

    render(){
        let jokeId = this.state.joke.id;
        return(
            <Container className="py-5" fluid>

                <Row className="justify-content-center">
                    <Col>
                    <Row xs={1} className="mt-3 mb-3 text-center">
                        <h1 className="header-title"> { "Joke #" + this.state.joke.id }</h1>
                    </Row>
                    <Row>
                        <Col md={9} className="justify-content-center">
                            <Row className="my-5">
                                <ContentCard content={this.state.joke.content} categories={this.state.joke.categories} id={this.state.joke.id}></ContentCard>
                            </Row>
                            <Row className="justify-content-center">
                                <strong>Comments:</strong>
                                <CommentsList jokeId={jokeId}/>
                            </Row>
                            <Row className="justify-content-center py-4">
                                <Button href={"/comment/add/" + this.props.match.params.id}>
                                    Add comment
                                </Button>
                            </Row>
                        </Col>

                        <Col md={3} className="justify-content-center text-center py-5">
                            <UserSignature userId={this.state.joke.creator}></UserSignature>
                        </Col>
                    </Row>
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default JokeInfo;