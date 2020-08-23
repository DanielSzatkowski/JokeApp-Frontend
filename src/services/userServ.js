import req from './httpRequest';
import auth from './authServ';

class UserServ {

    #config = {}

    constructor(props) {
        super(props);
    
        this.#config = {
            Authorization: auth.getUserToken()
        }
    }

    /* GET requests */
    getBtId(id) {
        return req.get('/uers/' + id, config);
    }

    getOwnerOfComent(commentId) {
        return req.get('/users/owner/' + commentId + '/comment', config);
    }

    getOwnerofJoke(jokeId) {
        return req.get('/users/owner/' + jokeId + '/joke', config);
    }
}