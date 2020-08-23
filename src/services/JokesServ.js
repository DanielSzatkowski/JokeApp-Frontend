import req from './httpRequest';
import auth from './authServ';

class JokesServ {
    
    #config = {}

    constructor(props) {
        super(props);

        this.#config = {
            Authorization: auth.getUserToken()
        }
    }

    /* GET requests */
    getAllJokes() {
        return req.get('/jokes', config);
    }

    getJoke(id) {
        return req.get('/jokes/' + id, config);
    }

    getAllJokesByCategories(category) {
        return req.get('/jokes/' + category.forEach((element) => element = ','), config);
    }

    getJokesOfUser(id) {
        return req.get('/jokes/user/' + id, config);
    }

    /* POST requests */
    addJoke(joke, categories) {
        return req.post('/jokes', {
            categories,
            content: joke
        }, config);
    }

    /* PUT requests */
    updateJoke(id, joke, category) {
        return req.post('/jokes/' + id, {
            categories,
            content: joke
        }, config);
    }

    /* DELETE requests */
    deleteJoke(id) {
        return req.delete('/jokes/' + id, config);
    }
}

export default new JokesServ();