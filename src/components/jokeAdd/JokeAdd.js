import React, {Component} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {jokeCategoriesConst} from "../../constants";
import jokeServ from "../../services/jokesServ";
import {Row, Form, Alert, Spinner, Button, Modal, Container, Col} from "react-bootstrap";


class JokeAdd extends Component {

    constructor(props){
        super(props);

        this.state = {
            addingJokeFailed: false,
            showSuccess: false,
            radioButtonTouched: false
        }
    }

    setShowSuccess = (value) => {
        this.setState({showSuccess: value})
    }


    render(){
        return(
            <>            
                <Modal show={this.state.showSuccess} onHide={()=>{this.setState({showSuccess: false})}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Joke added successfully!</Modal.Title>
                        <p>Your joke was successfully added!</p>
                    </Modal.Header>
                </Modal>

                <Formik
                    initialValues={{
                        content: '',
                        categories: []
                    }}
                    validationSchema={Yup.object().shape({
                        content: Yup.string()
                            .min(1, "Content too short!")
                            .required("Content is required!"),
                        categories: Yup.array()
                            .of(Yup.string()
                                .uppercase()
                                .oneOf(jokeCategoriesConst))
                            .min(1, "Categories are required!")
                    })}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);

                        jokeServ.addJoke(values.content, values.categories)
                            .then(() => {
                                this.setShowSuccess(true);
                            })
                            .catch((err) => {
                                this.setState({addingJokeFailed: true});
                                console.log(err);
                            });

                        console.log(values.categories);
                        setSubmitting(false);
                        values.categories.splice(0, values.categories.length);
                        resetForm();
                    }}
                >

                {({values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit}) => (

                    <Container className="justify-content-center" >
                        <Form onSubmit={handleSubmit}>
                        <Col md={{span:8, offset: 2}}>
                            <Row className="pt-5 pb-3 justify-content-center">
                                <h1 className="header-title">Add Joke!</h1>
                            </Row>
                            <Row className="justify-content-center mt-4 mb-3 mx-5 px-5">
                                <Col>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="content"
                                            name="content"
                                            value={values.content}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.content && errors.content}
                                            disabled={isSubmitting}
                                        />
                                    </Form.Group>
                                    {(touched.content && errors.content) && (
                                        <Form.Control.Feedback type="invalid">{errors.content} </Form.Control.Feedback>
                                    )}
                                </Col>
                            </Row>

                            <Row xs={2} className="mx-5 px-5 text-center mt-3">
                                {jokeCategoriesConst.map( (category, index) => (
                                    <Col>
                                        <input
                                            type="checkbox"
                                            key={index}
                                            value={category}
                                            id={category}
                                            checked={(values.categories.includes(category))}
                                            onChange={()=>{
                                                if(values.categories.includes(category)){
                                                    const index = values.categories.indexOf(category);
                                                    if(index > -1){
                                                        values.categories.splice(index, 1);
                                                    }
                                                } else {
                                                    values.categories.push(category);
                                                }   
                                                this.setState({radioButtonTouched: true});
                                            }}
                                        />
                                        <label htmlFor={category}> {category.toLowerCase().replace("_", " ")} </label> <br />
                                    </Col>
                                ))}
                                {() => {
                                    let isTouched = this.state.radioButtonTouched;
                                    console.log("jestem");
                                    return(
                                        (isTouched && errors.categories) && (<Form.Control.Feedback type="invalid">{errors.categories}</Form.Control.Feedback>)
                                    );
                                }}
                            </Row>
                            <Row>
                                {this.state.addingJokeFailed ? (
                                    <Alert variant="danger">
                                        <Alert.Heading> Adding joke failed! </Alert.Heading>
                                        <p> Please try again later... </p>
                                    </Alert> ) : null
                                }
                            </Row>
                            <Row className="justify-content-center mt-5">
                                <Form.Group as={Row} className="d-flex justify-content-center mx-5">
                                    <Button type="submit" disabled={isSubmitting} className="d-flex justify-content-center mx-5">
                                        {isSubmitting ? <Spinner animation="border"/> : "Add joke" }
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Col>
                        </Form>
                    </Container>
                )}

                </Formik>
            </>
        );
    }
}

export default JokeAdd;