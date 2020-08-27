import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Auth from '../../../services/authServ';
import { Container, Row, Form, Button, Spinner } from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginFailed: false
        }
    }

    render() {
        return (
            <Container className="mt-3 p-3 fluid">
                <Row className="mt-5 pb-2 justify-content-center text-center">
                    <h2>LOG IN</h2>
                </Row>
                
                <Row className="p-2 justify-content-center text-center">
                    <Formik
                        initialValues = {{
                            login: '',
                            password: '',
                        }} 
                        validationSchema = { Yup.object().shape({
                            login: Yup.string()
                                .required('Login is required!'),
                            password: Yup.string()
                                .required('Password is required!')
                        })}
                        onSubmit = {(values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);

                            Auth.authorize(values.login, values.password)
                                .then(() => {
                                    this.props.history.push("/jokes"); 
                                    window.location.reload();
                                })
                                .catch((err) => {
                                    this.setState({ loginFailed: true });
                                    console.log(err);
                                });

                            setSubmitting(false);
                            resetForm();
                        }}>
                        
                        {({ values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} className='mx-5'>
                                    <Form.Control
                                        type='text'
                                        placeholder='login'
                                        name='login'
                                        value={values.login}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.login && errors.login}
                                        disabled={isSubmitting}
                                    />  
                                </Form.Group>
                                {(touched.login && errors.login) && (
                                    <Form.Control.Feedback type='invalid'>{errors.login}</Form.Control.Feedback>
                                )}

                                <Form.Group as={Row} className='mx-5'>
                                    <Form.Control
                                        type='password'
                                        placeholder='password'
                                        name='password'
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && errors.password}
                                        disabled={isSubmitting}
                                    />  
                                </Form.Group>
                                {(touched.password && errors.password) && (
                                    <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                                )}
                                { this.state.loginFailed ? <div> Login has failed! Please try again! </div> : null }
                                
                                <Form.Group as={Row} className="d-flex justify-content-center mx-5">
                                    <Button type="submit" disabled={isSubmitting} className="d-flex justify-content-center mx-5">
                                        {isSubmitting ? <Spinner animation="border"/> : "Log in" }
                                    </Button>
                                </Form.Group>
                            </Form>
                        )}
                    </Formik>
                </Row>
                        
            </Container>
        );
    }

}

export default Login;