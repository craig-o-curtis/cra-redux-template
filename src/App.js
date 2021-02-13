import React from "react";
import "rsuite/dist/styles/rsuite-default.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Container from "rsuite/lib/Container";
import Navbar from "rsuite/lib/Navbar";
import Nav from "rsuite/lib/Nav";
import Button from "rsuite/lib/Button";
import Counter from "./features/counter/Counter";
import Todos from "./features/todos/Todos";
import Posts from "./features/posts/Posts";
import Users from "./features/users/Users";
import TextDebounce from "./features/textDebounce/TextDebounce";

function App() {
  return (
    <Container>
      <Router>
        <Navbar>
          <Navbar.Body>
            <Nav>
              <NavLink to="/">
                <Button size="lg">Default Counter</Button>
              </NavLink>
              <NavLink to="/todos">
                <Button size="lg">Basic Store</Button>
              </NavLink>
              <NavLink to="/posts">
                <Button size="lg">Async API Calls</Button>
              </NavLink>
              <NavLink to="/users">
                <Button size="lg">Normalized Data</Button>
              </NavLink>
              <NavLink to="/debounce">
                <Button size="lg">Debounced Text</Button>
              </NavLink>
            </Nav>
          </Navbar.Body>
        </Navbar>

        <Switch>
          <Route path="/todos">
            <Todos />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/debounce">
            <TextDebounce />
          </Route>
          <Route path="/">
            <Counter />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
