import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Auth from '../../../services/authServ';
import { Container, Row, Form, Button, Spinner } from 'react-bootstrap';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            regisitrationFailed: false,
        }
    }

    render() {
        return (
            <Container className="mt-3 p-3 fluid">
                <Row className="mt-5 pb-2 justify-content-center text-center">
                    <h2>REGISTARTION</h2>
                </Row>
                
                <Row className="p-2 justify-content-center text-center">
                    <Formik
                        initialValues = {{
                            login: '',
                            email: '',
                            password: '',
                            description: '',
                            passwordConfirmation: ''
                        }} 
                        validationSchema = { Yup.object().shape({
                            login: Yup.string()
                                .required('Login is required!'),
                            password: Yup.string()
                                .required('Password is required!')
                                .min(8, "Password has to be minimum 8 characters long")
                                .matches(
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                ),
                            passwordConfirmation: Yup.string()
                                .required("Confirm your password!")
                                .oneOf([Yup.ref('password'), null], "Passwords must match!"),
                            email: Yup.string()
                                .email("Invalid email!")
                                .required('Email is required!'),
                            description: Yup.string()
                        })}
                        onSubmit = {(values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);

                            Auth.register(values.login, values.password, values.email, values.description)
                                .then(() => {
                                    this.props.history.push("/");
                                    window.location.reload();
                                })
                                .catch((err) => {
                                    this.setState({ registrationFailed: true });
                                    console.log(err);
                                });

                            setSubmitting(false);
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
                                        type='text'
                                        placeholder='email'
                                        name='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && errors.email}
                                        disabled={isSubmitting}
                                    />  
                                </Form.Group>
                                {(touched.email && errors.email) && (
                                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
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

                                <Form.Group as={Row} className='mx-5'>
                                    <Form.Control
                                        type='password'
                                        placeholder='confirm your password'
                                        name='passwordConfirmation'
                                        value={values.passwordConfirmation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.passwordConfirmation && errors.passwordConfirmation}
                                        disabled={isSubmitting}
                                    />  
                                </Form.Group>
                                {(touched.passwordConfirmation && errors.passworpasswordConfirmation) && (
                                    <Form.Control.Feedback type='invalid'>{errors.passwordConfirmation}</Form.Control.Feedback>
                                )}

                                <Form.Group as={Row} className='mx-5'>
                                    <Form.Control
                                        type='text'
                                        as='textarea'
                                        placeholder='description'
                                        name='description'
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.description && errors.description}
                                        disabled={isSubmitting}
                                    />  
                                </Form.Group>
                                {(touched.description && errors.description) && (
                                    <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                                )}

                                { this.state.registrationFailed ? <div> Registration has failed! Please try again! </div> : null }

                                <Form.Group as={Row} className="d-flex justify-content-center mx-5">
                                    <Button type="submit" disabled={isSubmitting} className="d-flex justify-content-center mx-5">
                                        {isSubmitting ? <Spinner animation="border"/> : "Register" }
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
    
    export default Registration;