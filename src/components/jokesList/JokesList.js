import React, {Component} from "react";
import jokesServ from "../../services/jokesServ"

class JokesList extends Component {
    state = {
        jokes: []
    }

    componentDidMount() {
        let that = this;
        jokesServ.getAllJokes().then((resp) => {
            that.setState({
                jokes: resp.data
            });

            console.log(that.state.jokes);
        }).catch(err => {
            window.alert("Cannot download jokes!")
            console.log(err);
        });
    }

    render(){
        return(
            <ul>
                {this.state.jokes.map((jokeObj) => {
                    return (
                        <a href={"/jokes/" + jokeObj.id} key={jokeObj.id}>
                            <li>
                                {jokeObj.content}
                                {jokeObj.categories.map((category, i) => {
                                    return (
                                        <p key={jokeObj.id.toString() + i.toString()}>{category}</p>
                                    )
                                })}
                            </li>
                        </a>
                        );
                })}
            </ul>
        )
    };
}

export default JokesList;