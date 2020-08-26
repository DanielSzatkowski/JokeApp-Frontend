import React, {Component} from "react";
import { Container, Row, Col} from 'react-bootstrap';
import ContentCard from '../contentCard';
import jokesServ from '../../services/jokesServ';
import userServ from '../../services/userServ';
import commentsServ from "../../services/commentsServ";

class JokeInfo extends Component {
    state = {
        joke: {
            id: '',
            content: '',
            creator: '',
            categories: [],
            comments: []
        },

        owner: {
            id: 1,
            email: "",
            login: "",
            description: null,
            avatar: null,
            creationDate: "",
            jokes: [],
            comments: [],
            rolesAsGrantedAuthorities: []
        },

        jokesComments: []
    }

    componentDidMount() {
        jokesServ.getJoke(this.props.match.params.id).then((jokeResp) => {
            this.setState({
                joke: jokeResp.data
            });

            //userServ.getById(this.state.joke.creator).then((resp) => {
            userServ.getById(jokeResp.data.creator).then((resp) => {
                this.setState({
                    owner: resp.data
                });

                commentsServ.getAllOfJoke(jokeResp.data.id).then((resp) => {
                    this.setState({
                        jokesComments: resp.data
                    });

                    console.log(this.state);
                }).catch((err) => {
                    console.log(err);
                    window.alert("Cannot download jokes comments!");
                });
            }).catch((err) => {
                console.log(err);
                window.alert("Cannot download info about the owner of the joke!");
            });
        }).catch((err) => {
            console.log(err);
            window.alert("Cannot download joke!");
        });

        console.log(this.state);
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col className="md-8">
                        <ContentCard content={this.state.joke.content} categories={this.state.joke.categories} id={this.state.joke.id}></ContentCard>
                    </Col>
                    <Col className="md-4">
                        
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default JokeInfo;