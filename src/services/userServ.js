import req from './httpRequest';
import auth from './authServ';

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
}

export default new UserServ();