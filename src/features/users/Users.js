import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  // Custom Selectors
  selectUsersStatus,
  // Entity Adapter Selectors
  selectAllUsers,
  selectUserTotal,
  selectAllArticles,
  selectAllComments,
} from "./usersSlice";
import Container from "rsuite/lib/Container";
import Header from "rsuite/lib/Header";
import Content from "rsuite/lib/Content";
import Panel from "rsuite/lib/Panel";
import Divider from "rsuite/lib/Divider";
import Loader from "rsuite/lib/Loader";
import List from "rsuite/lib/List";
import Message from "rsuite/lib/Message";
import FormGroup from "rsuite/lib/FormGroup";
import RadioGroup from "rsuite/lib/RadioGroup";
import Radio from "rsuite/lib/Radio";
import { FlexboxGrid } from "rsuite";
import ArticleListItem from "./ArticleListItem";
import CommentListItem from "./CommentListItem";

const Users = () => {
  const [radioToggle, setRadioToggle] = useState(1);
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  const allArticles = useSelector(selectAllArticles);
  const allComments = useSelector(selectAllComments);
  const totalUsers = useSelector(selectUserTotal);
  const usersStatus = useSelector(selectUsersStatus);
  const isProd = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (isProd) return;
    const getData = async () => await dispatch(fetchData());
    getData();
  }, [dispatch, isProd]);

  return (
    <Container>
      <Header style={{ textAlign: "center" }}>
        <h2>Normalized Data with createEntityAdapter</h2>
      </Header>
      <Content>
        {usersStatus === "loading" && <Loader size="lg" speed="fast" center />}
        <Divider />
        <Panel header="Check Redux Devtools and API call to compare structure">
          <p>
            Based on Tutorial from{" "}
            <a
              href="https://www.youtube.com/watch?v=dDWj1uL8raU"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rowadz Redux Toolkit Tutorial #8
            </a>
          </p>
          <p>
            Can try reading, but not straight-forward:{" "}
            <a
              href="https://redux-toolkit.js.org/api/createEntityAdapter"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit Docs
            </a>
          </p>
        </Panel>
        <Divider />
        {isProd && (
          <>
            <Message
              type="warning"
              description="Run locally with json-server for example"
            />
          </>
        )}
        {!isProd && (
          <>
            <FlexboxGrid justify="center">
              <FormGroup controlId="radioList">
                <RadioGroup
                  name="radioList"
                  defaultValue={1}
                  inline
                  onChange={(val) => setRadioToggle(val)}
                >
                  <Radio value={1}>Show Users</Radio>
                  <Radio value={2}>Show Articles</Radio>
                  <Radio value={3}>Show Comments</Radio>
                </RadioGroup>
              </FormGroup>
            </FlexboxGrid>
            {/* // ** USERS */}
            {radioToggle === 1 && (
              <>
                <Panel header="From Users slice">
                  <h3>Total Users: {totalUsers}</h3>
                  <List bordered>
                    {allUsers &&
                      allUsers.map((user) => (
                        <List.Item key={user.id}>
                          <h3>{user.name}</h3>
                          <a href={`mailto: ${user.email}`}>{user.email}</a>
                          <p>Total Articles: {user.articles.length}</p>
                          <p>Total Comments: {user.comments.length}</p>
                        </List.Item>
                      ))}
                  </List>
                </Panel>
              </>
            )}
            {/* // ** ARTICLES */}
            {radioToggle === 2 && (
              <Panel>
                <List bordered>
                  {allArticles &&
                    allArticles.map((article) => (
                      <ArticleListItem key={article.id} article={article} />
                    ))}
                </List>
              </Panel>
            )}
            {/* // ** COMMENTS */}
            {radioToggle === 3 && (
              <Panel>
                <List bordered>
                  {allComments &&
                    allComments.map((comment) => (
                      <CommentListItem key={comment.id} comment={comment} />
                    ))}
                </List>
              </Panel>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default Users;
