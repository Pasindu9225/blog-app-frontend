import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments = [] }) => {
  return (
    <div>
      {comments.length === 0 ? (
        <h3>No comments</h3>
      ) : (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentList;
