import req from './httpRequest';
import auth from './authServ';

class UserServ {

    #config = {}

    constructor(props) {   
        this.#config = {
            headers: {
                Authorization: auth.getUserToken()
            }
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