import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Alert from "rsuite/lib/Alert";

// jsonplaceholder.typicode.com/posts
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  // async ({ limit }, { dispatch, getState }) => {
  //   return fetch(
  //     `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
  //   ).then((res) => res.json());
  // .catch((error) => console.error(`ERROR: ${error}`));
  // }
  async ({ limit }, { dispatch, getState }) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
      );
      const json = await res.json();
      return json;
    } catch (error) {
      // Errors for console
      console.error(`ERROR: ${error}`);
      throw new Error();
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      // state.status = "loading";
      Alert.info("Loading Data");
      return {
        ...state,
        status: "loading",
      };
    },
    [getPosts.rejected]: (state) => {
      // state.status = "failed";
      Alert.error("Error Loading Data");
      return {
        ...state,
        status: "failed",
      };
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      // state.status = "success";
      // state.list = payload;
      Alert.success("Loaded Data");
      return {
        list: [...payload],
        status: "success",
      };
    },
  },
});

// Selectors don't work with async thunks....
export const selectPostsStatus = (store) => store.posts.status;
export const selectPosts = (store) => store.posts.list;

// TODO add ahooks, reload when focus

export default postsSlice.reducer;
