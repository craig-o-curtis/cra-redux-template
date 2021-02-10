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
import Counter from "./features/counter/Counter";
import Todos from "./features/todos/Todos";

function App() {
  return (
    <Container>
      <Router>
        <Navbar>
          <Navbar.Body>
            <Nav>
              <NavLink to="/">
                <Nav.Item>Default Counter</Nav.Item>
              </NavLink>
              <NavLink to="/todos">
                <Nav.Item>Todos</Nav.Item>
              </NavLink>
            </Nav>
          </Navbar.Body>
        </Navbar>

        <Switch>
          <Route path="/todos">
            <Todos />
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
