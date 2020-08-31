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

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/jokes"> Jokes </Nav.Link>
              { (localStorage.getItem('token') !== null) &&
                <Nav.Link href="/joke/add"> Add Joke </Nav.Link>
              }
            </Nav>
            <Nav className="ml-auto">
              { (localStorage.getItem('token') === null) &&
                <Nav.Link href="/login"> Log in </Nav.Link>
              }

              { (localStorage.getItem('token') !== null) &&
              <Nav.Link href="/" onClick={auth.logout}>
                Log out
              </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <div>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <PrivateRoute exact path={"/jokes"} component={JokesList}/>
          <Route exact path={"/login"} component={Login}/>
          <PrivateRoute exact path={"/jokes/:id"} component={JokeInfo}/>
          <PrivateRoute exact path={"/joke/add"} component={JokeAdd} />
          <PrivateRoute exact path={"/comment/add/:jokeId"} component={CommentAdd} />
          <PrivateRoute exact path={"/users/:id"} component={UserInfo}/>
          <Route exact path={"/registration"} component={Registration}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
