import React from "react";
import {Card} from "react-bootstrap";
import anonymousUser from "../../../img/anonymoususer.png";
import "../userinfo.css";


function UserSignature(props){

    let user = props.user;

    if(user && user.avatar){
        //TODO base64 decoding
    } else {
        user.avatar = anonymousUser;
    }

    return(
        <Card className="my-5 py-5">
            <Card.Img src={user.avatar} thumbnail="true" className="profile-img mx-auto px-5 pt-2" />
            <Card.Body>
                <a href={'/users/' +  user.id}>
                    <Card.Title className="text-center"> {user.login} </Card.Title>
                </a>
            </Card.Body>
        </Card>
    );
}

export default UserSignature;