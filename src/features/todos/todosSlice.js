import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      return [...state, { id: uuidv4(), text: action.payload }];
    },
    removeTodo: (state, action) => {
      return [...state.filter((todo) => todo.id !== action.payload)];
    },
  },
});

// sample API - https://jsonplaceholder.typicode.com/
// jsonplaceholder.typicode.com/posts

export const { addTodo, removeTodo } = todosSlice.actions;

export const selectTodos = (state) => state.todos;
export const selectTodo = (state, id) =>
  state.todos.find((todo) => todo.id === id);

export default todosSlice.reducer;
