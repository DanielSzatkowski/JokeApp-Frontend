import React, {Component} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import commentServ from "../../services/commentsServ";
import {Form, Modal, Row, Alert, Button, Spinner, Container} from "react-bootstrap";
import "./comment-add.css";


class CommentAdd extends Component {

    constructor(props){
        super(props);

        this.state={
            addingCommentFailed: false,
            showSuccess: false
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
                        <Modal.Title>Comment added successfully!</Modal.Title>
                        <p>Your comment was successfully added!</p>
                    </Modal.Header>
                </Modal>

                <Formik
                    initialValues={{
                        content: ""
                    }}
                    validationSchema={
                        Yup.object().shape({
                            content: Yup.string()
                                .min(3, "Content too short!")
                                .required("Content is required!")
                        })
                    }

                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);

                        commentServ.save(values.content, this.props.match.params.jokeId)
                            .then(()=>{
                                this.setShowSuccess(true);
                            })
                            .catch((err) => {
                                this.setState({addingCommentFailed: true});
                            })

                        setSubmitting(false);
                        resetForm();
                    }}
                >

                {({values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit}) => (
                    <Container>
                        <h2>Add comment</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row}>
                                <Form.Control
                                    type="text"
                                    as="textarea"
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

                            {this.state.addingCommentFailed && (
                                <Alert variant="danger">
                                    <Alert.Heading> Adding joke failed! </Alert.Heading>
                                    <p> Please try again later... </p>
                                </Alert> )
                            }

                            <Form.Group as={Row} className="d-flex justify-content-center mx-5">
                                <Button type="submit" disabled={isSubmitting} className="d-flex justify-content-center mx-5">
                                    {isSubmitting ? <Spinner animation="border"/> : "Add comment" }
                                </Button>
                            </Form.Group>
                        </Form>
                    </Container>                    
                )}

                </Formik>
            </>

        );
    }

}

export default CommentAdd;