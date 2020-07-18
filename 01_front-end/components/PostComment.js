import React from 'react';

const PostComment = ({ author, content }) => {
  return (
    <div>
      {author}
      {content}
    </div>
  );
};

export default PostComment;