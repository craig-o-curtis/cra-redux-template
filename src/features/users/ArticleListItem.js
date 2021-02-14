import React from "react";
import List from "rsuite/lib/List";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";

/**
 * README
 * to useSelector, must NOT be in conditionally part of JSX
 * Therefore split this into it's own component
 */

const ArticleListItem = ({ article }) => {
  // ** Selects the individual user object from the store.users slice
  const { name, email } = useSelector(selectUserById(article.userId));

  return (
    <List.Item>
      <img
        src={article.image}
        style={{
          maxWidth: "100%",
          objectFit: "contain",
          maxHeight: "5rem",
        }}
        alt={`article by ${name}`}
      />
      <p>{article.paragraphs}</p>
      <p>Author: {name}</p>
      <a href={`mailto: ${email}`} target="_blank" rel="noopener noreferrer">
        {email}
      </a>
    </List.Item>
  );
};

export default ArticleListItem;
