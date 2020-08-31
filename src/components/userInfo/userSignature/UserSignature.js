import React, {Component} from "react";
import {Card} from "react-bootstrap";
import anonymousUser from "../../../img/anonymoususer.png";
import "../userinfo.css";
import userServ from "../../../services/userServ";


class UserSignature extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: "",
                avatar: "",
                login: ""
            }
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.userId !== this.props.userId){
            this.getUser();
        }
    }

    getUser(){
        let userId = this.props.userId;
        
        userServ.getById(userId)
            .then((resp) => {
                let {data} = resp;

                this.setState({
                    user: data,
                });

            }).catch((err) => {
                console.log("Cannot download user info!");
            });
    }

    render() {
        let user = this.state.user;

        if(user && user.avatar){
            user.avatar = "data:image/jpeg;base64," + user.avatar;
        } else {
            user.avatar = anonymousUser;
        }

        return(

            <Card className="my-5 py-5">
                <Card.Img src={anonymousUser} thumbnail="true" className="profile-img mx-auto px-5 pt-2" />
                <Card.Body>
                    <a href={'/users/' +  user.id}>
                        <Card.Title className="text-center"> {user.login} </Card.Title>
                    </a>
                </Card.Body>
            </Card>
        );
    }
}

export default UserSignature;