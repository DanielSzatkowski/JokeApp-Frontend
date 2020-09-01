import React, {Component} from "react";
import userServ from '../../services/userServ';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

class UploadImage extends Component {

    constructor(props){
        super(props);

        this.state = {
            preview: '',
            raw: '',

            show: true
        }

        this.handleImageChange.bind(this);
        this.handleUpload.bind(this);
        this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            show: false
        });

        this.props.history.push("/jokes");
        window.location.reload();
    }

    handleImageChange = (e) => {
        e.preventDefault();

        if (e.target.files.length) {
            this.setState({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    };

    handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('file', this.state.raw);
        userServ.uploadAvatar(formData)
            .then((resp) => {
                console.log(resp);

                this.props.history.push("/jokes");
                window.location.reload();
            }).catch((err) => {
                console.log(err);
            });
    };

    render(){
        return(
            <Modal show={this.state.show} onHide={this.handleClose.bind(this)} centered>
                <Modal.Header closeButton className='d-flex justify-content-center mb-1 mt-2'>
                    <h3>Edit avatar</h3>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center'>
                    <label htmlFor='upload-button'>
                        {this.state.preview ? (
                            <img
                                src={this.state.preview}
                                alt='cannot load image'
                                width='300'
                                height='300'
                            />
                        ) : (
                            <>
                                <h5 className='text-center'>choose photo</h5>
                            </>
                        )}
                    </label>

                    <input
                        type='file'
                        id='upload-button'
                        style={{ display: 'none' }}
                        onChange={this.handleImageChange}
                    />
                    <br />
                    <button onClick={this.handleUpload}>Send photo</button>
                </Modal.Body>
            </Modal>

            /*<div>
                <label htmlFor='upload-button'>
                    {this.state.preview ? (
                        <img
                            src={this.state.preview}
                            alt='dummy'
                            width='300'
                            height='300'
                        />
                    ) : (
                        <>
                            <h5 className='text-center'>choose photo</h5>
                        </>
                    )}
                </label>
                <input
                    type='file'
                    id='upload-button'
                    style={{ display: 'none' }}
                    onChange={this.handleImageChange}
                />
                <br />
                <button onClick={this.handleUpload}>Send photo</button>
            </div>*/
        );
    };
}

export default UploadImage;