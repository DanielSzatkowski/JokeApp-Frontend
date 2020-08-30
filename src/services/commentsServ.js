import req from "./httpRequest";
import auth from './authServ';


class CommentsServ{

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


    getAll(){
        return req.get("/comments", this.#config);
    }

    getAllOfJoke(jokeId, params){
        this.#config.params = params;
        return req.get("/comments/joke/" + jokeId, this.#config);
    }

    getAllOfUser(userId){
        return req.get("/comments/user" + userId, this.#config);
    }

    save(content, jokeId){
        return req.post("/comments", {
            content,
            jokeId
        }, this.#config);
    }

    update(id, content){
        return req.put("/comments/" + id, {
            content
        }, this.#config);
    }

    delete(id){
        return req.delete("/comments/" + id, this.#config);
    }

}

export default new CommentsServ();