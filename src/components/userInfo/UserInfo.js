import React, {Component} from "react";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import userServ from "../../services/userServ";
import "../../index.css";
import "./userinfo.css";
import anonymousUser from "../../img/anonymoususer.png";


class UserInfo extends Component {

    constructor(props){
        super(props);
        this.getUser = this.getUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                email: "",
                login: "",
                description: "",
                avatar: null,
                creationDate: undefined
            }
        }
    }

    componentDidMount(){
        this.getUser(this.props.match.params.id);
    }


    getUser(id){
        userServ.getById(id)
            .then(response => {
                const user = response.data;
                this.setState({
                    currentUser: user
                });
            })
            .catch(e => {
                console.log(e);
            });
    }


    render(){
        let user = this.state.currentUser;

        if(!user.avatar){
            user.avatar = anonymousUser;
        } else {
            user.avatar = "data:image/jpeg;base64," + user.avatar;
        }

        console.log(user);

        return(
            <Container fluid className="background-container">
                <Row>
                    <Col md={{span:6, offset: 3}} lg={{span:4, offset:4}} className="border-black justify-content-center text-center">
                        <Card className="foreground-container my-5 py-5" >
                            <Card.Img src={user.avatar} thumbnail="true" className="profile-img mx-auto px-5 pt-2" />
                            <Card.Body className="py-5 my-5">
                                <Card.Title> {user.login} </Card.Title>
                                <Card.Text> Email: {user.email} </Card.Text>
                                <Card.Text> Description: {(!user.description || user.description === "") ? (
                                        "No description was given by this user!"
                                    ) : 
                                        (user.description)
                                    } 
                                </Card.Text>
                                <Card.Text> Joined: {user.creationDate} </Card.Text>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        )
    };
}

export default UserInfo;