import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import jokesServ from "../../services/jokesServ";
import ContentCard from "../contentCard";
import { Pagination } from "@material-ui/lab";
import "../../index.css";

class JokesList extends Component {

    constructor(props){
        super(props);

        this.state = {
            jokes: [],

            page: 1,
            size: 5,
            totalPages: 0,
            totalElements: 0
        }

    }

    getPagingParams = () => {
        let {page, size} = this.state;

        if(page){
            page = page - 1;
        }

        let sort = "id,desc";

        return {page, size, sort};

    }

    componentDidMount() {
        this.getJokes();
    }

    getJokes = () => {
        jokesServ.getAllJokes(this.getPagingParams()).then((resp) => {
            let {data} = resp;

            this.setState({
                jokes: data.content,
                totalPages: data.totalPages,
                totalElements: data.totalElements
            });
        }).catch(err => {
            window.alert("Cannot download jokes!");
        });
    }

    handlePageChange = (event, value) => {
        this.setState({
            page: value
        } , ()=> {
            this.getJokes();
        });
    }

    render(){
        const {page, totalPages} = this.state;

        return(
            <Container fluid className="background-container">
                <Row className="pt-5 pb-3 justify-content-center">
                    <h1 className="header-title">Recent Jokes</h1>
                </Row>
                <Row>
                    <Col>
                    <ul className="no-bullet">
                        {this.state.jokes.map((jokeObj) => {
                            return (
                                <a href={"/jokes/" + jokeObj.id} key={jokeObj.id} className="no-text-deco">
                                    <li>
                                        <ContentCard content={jokeObj.content} categories={jokeObj.categories} id={jokeObj.id} />
                                    </li>
                                </a>
                            );
                        })}
                    </ul>
                    </Col>
                </Row>
                <Row className="justify-content-center pt-2 pb-5">
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
            </Container>
        )
    };
}

export default JokesList;