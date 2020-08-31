import React, {Component} from "react";
import { Container, Row, Col, Button} from 'react-bootstrap';
import ContentCard from '../contentCard';
import { UserSignature } from '../userInfo';
import jokesServ from '../../services/jokesServ';
import userServ from '../../services/userServ';
import commentsServ from "../../services/commentsServ";
import CommentsList from "../commentsList";

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

        console.log("here " + this.state.joke.creator.id);
        return(
            <Container>
                <Row>
                    <Col md={4}>
                        <ContentCard content={this.state.joke.content} categories={this.state.joke.categories} id={this.state.joke.id}></ContentCard>
                    </Col>
                    <Col md={4}>
                        <UserSignature userId={this.state.joke.creator}></UserSignature>
                    </Col>
                </Row>


                <CommentsList jokeId={jokeId}/>


                <Row>
                    <Button href={"/comment/add/" + this.props.match.params.id}>
                        Add comment
                    </Button>
                </Row>
            </Container>
        )
    };
}

export default JokeInfo;