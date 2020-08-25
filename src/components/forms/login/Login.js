import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Auth from '../../../services/authServ';
import { Spinner } from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wrongPassword: false
        }
    }

    render() {
        return (
            <Formik
                initialValues = {{
                    login: '',
                    password: '',
                }} 
                validationSchema = { Yup.object({
                    login: Yup.string()
                        .required('Login is required!'),
                    password: Yup.string()
                        .required('Password is required!')
                })}
                onSubmit = {(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    console.log(typeof Auth.authorize());

                    Auth.authorize(values.login, values.password)
                        .then(() => {
                            this.props.history.push("/"); //TODO: navigation
                            window.location.reload();
                        })
                        .catch((err) => {
                            if(err.response.status === 401) {
                                this.setState({ wrongPassword: true });
                            } else {
                                console.log(err);
                            }
                        });

                    setSubmitting(false);
                    resetForm();
                }}>
                
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <label htmlFor="login">login</label>
                        <Field id="login" 
                            name="login" 
                            placeholder="login" 
                            disabled={isSubmitting}
                            className={(errors.login && touched.login) ? 'is-invalid' : ''}
                        />
                        <ErrorMessage name="login" component="div" className="invalid-feedback" />

                        <label htmlFor="password">password</label>
                        <Field id="password" 
                            name="password" 
                            placeholder="login"
                            type="password" 
                            disabled={isSubmitting}
                            className={(errors.password && touched.password) ? 'is-invalid' : ''}
                        />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        { this.state.wrongPassword ? <div> wrong password </div> : null }

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner animation="border"/> : "Submit" }
                        </button>
                    </Form>
                )}
            </Formik>
        );
    }

}

export default Login;