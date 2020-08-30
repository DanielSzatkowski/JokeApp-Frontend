import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home";
import JokesList from "./components/jokesList";
import JokeInfo from "./components/jokeInfo";
import UserInfo from "./components/userInfo";
import PageNotFound from "./components/pageNotFound";
import Login from "./components/forms/login";
import Registration from "./components/forms/registration";
import JokeAdd from "./components/jokeAdd";
import CommentAdd from "./components/commentAdd";
import auth from "./services/authServ";
import PrivateRoute from './utils/PrivateRoute'

function App() {
  return (
    <Router>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/"> JokeApp </Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link href="/jokes"> Jokes </Nav.Link>
            <Nav.Link href="/joke/add"> Add Joke </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/login"> Log in </Nav.Link>
            <Nav.Link href="/" onClick={auth.logout}>
              Log out
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>

      <div>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <PrivateRoute exact path={"/jokes"} component={JokesList}/>
          <Route exact path={"/login"} component={Login}/>
<<<<<<< HEAD
          <Route exact path={"/jokes/:id"} component={JokeInfo}/>
          <Route exact path={"/joke/add"} component={JokeAdd} />
          <Route exact path={"/comment/add/:jokeId"} component={CommentAdd} />
          <Route exact path={"/users/:id"} component={UserInfo}/>
=======
          <PrivateRoute exact path={"/jokes/:id"} component={JokeInfo}/>
          <PrivateRoute exact path={"/users/:id"} component={UserInfo}/>
>>>>>>> added restrictions for users who haven't logged in yet
          <Route exact path={"/registration"} component={Registration}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
