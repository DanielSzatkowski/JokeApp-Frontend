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
            <Nav.Link href="login"> Log in </Nav.Link>
          </Nav>
        </Navbar>
      </div>

      <div>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route exact path={"/jokes"} component={JokesList}/>
          <Route exact path={"/login"} component={Login}/>
          <Route exact path={"/jokes/:id"} component={JokeInfo}/>
          <Route exact path={"/joke/add"} component={JokeAdd} />
          <Route exact path={"/users/:id"} component={UserInfo}/>
          <Route exact path={"/registration"} component={Registration}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
