import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import Alert from "rsuite/lib/Alert";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { dispatch, getState }) => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();

      const users = data.map(({ id, name, email, articles, comments }) => ({
        id,
        name,
        email,
        articles: articles.map(({ id }) => id),
        comments: comments.map(({ id }) => id),
      }));

      const articles = data
        .map((user) =>
          user.articles.map((article) => ({
            ...article,
            userId: user.id,
          }))
        )
        .flat();
      console.log("WIP - need to add articles, comments to store");
      console.log("articles");
      console.log(articles);

      // ** refactored with reduce
      const articlesReduced = data.reduce((acc, curr) => {
        const userArticles = curr.articles.map((article) => ({
          ...article,
          userId: curr.id,
        }));
        acc = acc.concat(userArticles);
        return acc;
      }, []);

      console.log("articlesReduced");
      console.log(articlesReduced);

      const comments = data
        .map((user) =>
          user.comments.map((comment) => ({
            ...comment,
            userId: user.id,
          }))
        )
        .flat();
      console.log("comments");
      console.log(comments);

      dispatch(setUsers(users));
      // dispatch(setArticles(articles));
      // dispatch(setComments(comments));
      // return json;
    } catch (error) {
      console.error(`ERROR: ${error}`);
      throw new Error();
    }
  }
);

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const articlesAdapter = createEntityAdapter({
  selectId: (user) => user.id,
});

const commentsAdapter = createEntityAdapter({
  selectId: (user) => user.id,
});

// ** Contained reducers in createEntityAdapter:
// usersAdapter.addOne
// usersAdapter.addMany
// usersAdapter.setAll
// usersAdapter.removeOne
// usersAdapter.removeMany
// usersAdapter.removeAll
// usersAdapter.updateOne
// usersAdapter.updateMany
// usersAdapter.upsertOne
// usersAdapter.upsertMany

const usersSlice = createSlice({
  name: "users",
  initialState: {
    status: null,
    // ids - will be created by adapter
    // entities - will be created by adapter
  },
  reducers: {
    // Normalized Users - methos generated by createEntityAdapter
    addUser: usersAdapter.addOne,
    setUsers: usersAdapter.setAll,
    addUsers: usersAdapter.addMany,
    updateUser: usersAdapter.updateOne,
    updateUsers: usersAdapter.updateMany,
    upsertUser: usersAdapter.upsertOne,
    upsertUsers: usersAdapter.upsertMany,
    removeUser: usersAdapter.removeOne,
    removeUsers: usersAdapter.removeMany,
    removeAllUsers: usersAdapter.removeAll,
    // Normalized Articles
    setArticles: articlesAdapter.setAll,
    // Normalized Comments
    setComments: commentsAdapter.setAll,
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      Alert.info("Loading Data");
      return {
        ...state,
        status: "loading",
      };
    },
    [fetchUsers.rejected]: (state, action) => {
      Alert.error("Error Loading Data");
      return {
        ...state,
        status: "failed",
      };
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      Alert.success("Loaded Data");
      // TODO - format data...
      return {
        ...state,
        status: "success",
      };
    },
  },
});

//** Selector Functions */
// usersAdapter.selectIds
// usersAdapter.selectEntities
// usersAdapter.selectAll
// usersAdapter.selectById
console.log("find selectors");
console.log(usersAdapter.getSelectors());

export const {
  addUser,
  setUsers,
  addUsers,
  setArticles,
  setComments,
} = usersSlice.actions;

export const selectUsersStatus = (store) => store.users.status;
// export const selectUsers = (store) => store.users.list;
// export const usersSelectors = usersAdapter.getSelectors((state) => state.users);
// console.log("usersSelectors");
// console.log(usersSelectors);
// console.log(usersSelectors.selectAll);
// console.log(usersSelectors.selectAll());

// export const {
//   selectAll : selectUsers,
//   selectById,
//   selectEntitiees,
//   selectIds,
//   selectTotal,
// } = usersAdapter.getSelectors();

export default usersSlice.reducer;
