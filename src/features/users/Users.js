import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUsersStatus } from "./usersSlice";
import Container from "rsuite/lib/Container";
import Header from "rsuite/lib/Header";
import Content from "rsuite/lib/Content";
import Divider from "rsuite/lib/Divider";
import Loader from "rsuite/lib/Loader";
import List from "rsuite/lib/List";
import Message from "rsuite/lib/Message";

const Users = () => {
  const dispatch = useDispatch();
  // const users = useSelector(usersSelectors);
  const usersStatus = useSelector(selectUsersStatus);
  const isProd = process.env.NODE_ENV === "production";

  console.log("got users");

  useEffect(() => {
    if (isProd) return;
    dispatch(fetchUsers());
  }, [dispatch, isProd]);

  return (
    <Container>
      <Header style={{ textAlign: "center" }}>
        <h2>Normalized Data with createEntityAdapter</h2>
      </Header>
      <Content>
        {usersStatus === "loading" && <Loader size="lg" speed="fast" center />}
        <Divider />
        <p>Work in Progress</p>
        <p>
          Awaiting follow-up video from{" "}
          <a
            href="https://www.youtube.com/watch?v=dDWj1uL8raU"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rowadz Redux Toolkit Tutorial #8
          </a>
        </p>
        <p>
          Can try reading, but not straight-foward:{" "}
          <a
            href="https://redux-toolkit.js.org/api/createEntityAdapter"
            target="_blank"
          >
            Redux Toolkit Docs
          </a>
        </p>
        {isProd && (
          <>
            <Message
              type="warning"
              description="Run locally with json-server for example"
            />
          </>
        )}
        {!isProd && (
          <List bordered>
            {/* {users &&
              users.map((user) => (
                <List.Item key={user.id}>USER here</List.Item>
              ))} */}
          </List>
        )}
      </Content>
    </Container>
  );
};

export default Users;
