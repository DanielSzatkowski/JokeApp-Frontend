import React, {Component} from "react";
import { Container, Row, Col} from 'react-bootstrap';
import ContentCard from '../contentCard';
import { UserSignature } from '../userInfo';
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

            userServ.getById(jokeResp.data.creator).then((resp) => {
                this.setState({
                    owner: resp.data
                });

                commentsServ.getAllOfJoke(jokeResp.data.id).then((resp) => {
                    this.setState({
                        jokesComments: resp.data
                    });
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
                    <Col md={4}>
                        <ContentCard content={this.state.joke.content} categories={this.state.joke.categories} id={this.state.joke.id}></ContentCard>
                    </Col>
                    <Col md={4}>
                        <UserSignature user={this.state.owner}></UserSignature>
                    </Col>
                </Row>

                <Row>
                    {this.state.jokesComments.map((commentObj) => {
                        return (
                            <ContentCard content={commentObj.content} 
                                authorName={commentObj.creatorLogin} 
                                authorId={commentObj.creatorId}
                                key={commentObj.id}>
                            </ContentCard>
                        )
                    })}
                </Row>
            </Container>
        )
    };
}

export default JokeInfo;