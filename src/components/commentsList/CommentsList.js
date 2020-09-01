import React, {Component} from "react";
import {Col, Row, Container} from "react-bootstrap";
import commentServ from "../../services/commentsServ";
import ContentCard from "../contentCard";
import { Pagination } from "@material-ui/lab";


class CommentsList extends Component {

    constructor(props){
        super(props);

        this.state = {
            comments: [],

            page: 1,
            size: 5,
            totalPages: 0,
            totalElements: 0,
        };

        this.getPagingParams = this.getPagingParams.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.getComments = this.getComments.bind(this);
    }


    componentDidUpdate(prevProps, prevState){
        if(prevProps.jokeId !== this.props.jokeId){
            this.getComments();
        }
    }

    getPagingParams(){
        let {page, size} = this.state;

        if(page){
            page = page - 1;
        }

        let sort = "id,desc";

        return {page, size, sort};
    }

    handlePageChange(event, value){
        this.setState({
            page: value
        }, () => {
            this.getComments();
        });

    }

    getComments(){
        let jokeId = this.props.jokeId;


        commentServ.getAllOfJoke(jokeId, this.getPagingParams())
            .then((resp) => {
                let {data} = resp;

                this.setState({
                    comments: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements
                });
            }).catch(err => {
                console.log("Cannot download comments!");
            });
    }


    render(){
        const {page, totalPages} = this.state;

        return(
            <Container fluid>
                <Col>
                    <Row className="justify-content-center">
                            {this.state.comments.map((commentObj) => {
                                return(
                                    <ContentCard content={commentObj.content} 
                                        authorName={commentObj.creatorLogin} 
                                        authorId={commentObj.creatorId}
                                        key={commentObj.id}>
                                    </ContentCard>
                                );
                            })}
                    </Row>
                    <Row className="justify-content-center py-3">
                        <Pagination
                            count={totalPages}
                            page={page}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                            onChange={this.handlePageChange}
                        />
                    </Row>
                </Col>
            </Container>
        );
    }

}

export default CommentsList;