import React, { useState } from "react";
import { addTodo, removeTodo, selectTodos } from "./todosSlice";
import { useSelector, useDispatch } from "react-redux";
import Button from "rsuite/lib/Button";
import Container from "rsuite/lib/Container";
import Header from "rsuite/lib/Header";
import Content from "rsuite/lib/Content";
import FlexboxGrid from "rsuite/lib/FlexboxGrid";
import Panel from "rsuite/lib/Panel";
import Form from "rsuite/lib/Form";
import FormGroup from "rsuite/lib/FormGroup";
import ControlLabel from "rsuite/lib/ControlLabel";
import FormControl from "rsuite/lib/FormControl";
import ButtonToolbar from "rsuite/lib/ButtonToolbar";
import Divider from "rsuite/lib/Divider";
import List from "rsuite/lib/List";
import IconButton from "rsuite/lib/IconButton";
import Icon from "rsuite/lib/Icon";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const [todoVal, setTodoVal] = useState("");

  const handleCreateTodo = (text) => {
    dispatch(addTodo(text));
    setTodoVal("");
  };

  return (
    <div className="main">
      <Container>
        <Header style={{ textAlign: "center" }}>
          <h2>Redux Toolkit Todos</h2>
        </Header>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Add Todo</h3>} bordered>
                <Form fluid>
                  <FormGroup>
                    <ControlLabel>What you wanna do?</ControlLabel>
                    <FormControl
                      name="task"
                      value={todoVal}
                      placeholder="Enter task"
                      onChange={(formValue) => setTodoVal(formValue)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ButtonToolbar>
                      <IconButton
                        color="green"
                        onClick={() => handleCreateTodo(todoVal)}
                        disabled={todoVal === ""}
                        icon={<Icon icon="plus" />}
                        circle
                      />
                    </ButtonToolbar>
                  </FormGroup>
                </Form>
              </Panel>
              <Divider />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>

        <Content style={{ maxWidth: "80%", width: "80%", margin: "0 auto" }}>
          <List bordered>
            {todos.map((todo) => (
              <List.Item key={todo.id}>
                <FlexboxGrid justify="space-between" align="middle">
                  <span>{todo.text}</span>
                  <IconButton
                    color="red"
                    onClick={() => dispatch(removeTodo(todo.id))}
                    icon={<Icon icon="minus" />}
                    circle
                  />
                </FlexboxGrid>
              </List.Item>
            ))}
          </List>
        </Content>
      </Container>
    </div>
  );
};

export default Todos;
