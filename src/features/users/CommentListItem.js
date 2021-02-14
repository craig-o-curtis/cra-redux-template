import React from "react";
import List from "rsuite/lib/List";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";

const CommentListItem = ({ comment }) => {
  const { name, email } = useSelector(selectUserById(comment.userId));

  return (
    <List.Item>
      <p>Author: {name}</p>
      <a href={`mailto: ${email}`} target="_blank" rel="noopener noreferrer">
        {email}
      </a>
      <p>{comment.paragraph}</p>
    </List.Item>
  );
};

export default CommentListItem;
