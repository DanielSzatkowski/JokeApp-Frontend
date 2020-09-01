import req from './httpRequest';
import {axiosUploadImage as reqImage} from './httpRequest';
import auth from './authServ';
import axios from 'axios';

class UserServ {

    #config = {}

    constructor(props){
        if(auth.getUserToken() !== false) {
            this.#config = {
                headers: {
                    Authorization: auth.getUserToken()
                }
            }
        } else {
            console.log("User's token not known!");
        }
    }

    /* GET requests */
    getById(id) {
        return req.get('/users/' + id, this.#config);
    }

    getOwnerOfComent(commentId) {
        return req.get('/users/owner/' + commentId + '/comment', this.#config);
    }

    getOwnerofJoke(jokeId) {
        return req.get('/users/owner/' + jokeId + '/joke', this.#config);
    }

    /* POST requests */
    uploadAvatar(formData){
        let customConfig = this.#config;
        customConfig["Content-Type"] = "multipart/form-data";

        /*return reqImage.post('/users/image', this.#config, {
            "data": formData
        });*/

        return axios("http://localhost:8443/api/users/image", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: this.#config.headers.Authorization,
            },
            data: formData,
        })
    }
}

export default new UserServ();