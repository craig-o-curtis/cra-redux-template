import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "rsuite/lib/Container";
import Header from "rsuite/lib/Header";
import Content from "rsuite/lib/Content";
import Loader from "rsuite/lib/Loader";
import List from "rsuite/lib/List";
import Divider from "rsuite/lib/Divider";
import { getPosts, selectPosts, selectPostsStatus } from "./postsSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsStatus = useSelector(selectPostsStatus);

  useEffect(() => {
    dispatch(getPosts({ limit: 5 }));
  }, [dispatch]);

  return (
    <Container>
      <Header style={{ textAlign: "center" }}>
        <h2>API calls with createAsyncThunk</h2>
      </Header>
      <Content>
        {postsStatus === "loading" && <Loader size="lg" speed="fast" center />}
        <Divider />
        <List bordered>
          {posts &&
            posts.map((post) => (
              <List.Item key={post.id}>
                <article>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </article>
              </List.Item>
            ))}
        </List>
      </Content>
    </Container>
  );
};

export default Posts;
