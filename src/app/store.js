import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import todosReducer from "../features/todos/todosSlice";
import postsSlice from "../features/posts/postsSlice";
import usersSlice from "../features/users/usersSlice";
import textDebounceSlice from "../features/textDebounce/textDebounceSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    posts: postsSlice,
    users: usersSlice,
    text: textDebounceSlice,
  },
});
