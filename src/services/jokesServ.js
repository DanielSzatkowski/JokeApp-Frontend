import req from './httpRequest';
import auth from './authServ';

class JokesServ {
    
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
    getAllJokes(params) {
        this.#config.params = params;
        return req.get('/jokes', this.#config);
    }

    getJoke(id) {
        return req.get('/jokes/' + id, this.#config);
    }

    getAllJokesByCategories(category) {
        return req.get('/jokes/' + category.forEach((element) => element = ','), this.#config);
    }

    getJokesOfUser(id) {
        return req.get('/jokes/user/' + id, this.#config);
    }

    /* POST requests */
    addJoke(joke, categories) {
        return req.post('/jokes', {
            categories,
            content: joke
        }, this.#config);
    }

    /* PUT requests */
    updateJoke(id, joke, categories) {
        return req.post('/jokes/' + id, {
            categories,
            content: joke
        }, this.#config);
    }

    /* DELETE requests */
    deleteJoke(id) {
        return req.delete('/jokes/' + id, this.#config);
    }
}

export default new JokesServ();